import { computePosition, flip, inline, shift } from "@floating-ui/dom"
import { normalizeRelativeURLs } from "../../util/path"
import { fetchCanonical } from "./util"

const p = new DOMParser()
let activeAnchor: HTMLAnchorElement | null = null

async function mouseEnterHandler(
  this: HTMLAnchorElement,
  { clientX, clientY }: { clientX: number; clientY: number },
) {
  const link = (activeAnchor = this)
  if (link.dataset.noPopover === "true") {
    return
  }

  async function setPosition(popoverElement: HTMLElement) {
    const { x, y } = await computePosition(link, popoverElement, {
      strategy: "fixed",
      middleware: [inline({ x: clientX, y: clientY }), shift(), flip()],
    })
    Object.assign(popoverElement.style, {
      transform: `translate(${x.toFixed()}px, ${y.toFixed()}px)`,
    })
  }

  function showPopover(popoverElement: HTMLElement) {
    clearActivePopover()
    popoverElement.classList.add("active-popover")
    setPosition(popoverElement as HTMLElement)
    
    const popoverInner = popoverElement.querySelector('.popover-inner') as HTMLElement | null;
    if (!popoverInner) return;
    
    if (hash !== "") {
      const targetAnchor = `#popover-internal-${hash.slice(1)}`
      const heading = popoverInner.querySelector(targetAnchor) as HTMLElement | null
      if (heading) {
        // leave ~12px of buffer when scrolling to a heading
        popoverInner.scroll({ top: heading.offsetTop - 12, behavior: "instant" })
      }
    }
  }

  const targetUrl = new URL(link.href)
  const hash = decodeURIComponent(targetUrl.hash)
  targetUrl.hash = ""
  targetUrl.search = ""
  const popoverId = `popover-${link.pathname}`
  const prevPopoverElement = document.getElementById(popoverId)

  // dont refetch if there's already a popover
  if (!!document.getElementById(popoverId)) {
    showPopover(prevPopoverElement as HTMLElement)
    return
  }

  const response = await fetchCanonical(targetUrl).catch((err) => {
    console.error(err)
  })

  if (!response) return
  const [contentType] = response.headers.get("Content-Type")!.split(";")
  const [contentTypeCategory, typeInfo] = contentType.split("/")

  const popoverElement = document.createElement("div")
  popoverElement.id = popoverId
  popoverElement.classList.add("popover")
  const popoverInner = document.createElement("div")
  popoverInner.classList.add("popover-inner")
  popoverInner.dataset.contentType = contentType ?? undefined
  popoverElement.appendChild(popoverInner)

  switch (contentTypeCategory) {
    case "image":
      const img = document.createElement("img")
      img.src = targetUrl.toString()
      img.alt = targetUrl.pathname

      popoverInner.appendChild(img)
      break
    case "application":
      switch (typeInfo) {
        case "pdf":
          const pdf = document.createElement("iframe")
          pdf.src = targetUrl.toString()
          popoverInner.appendChild(pdf)
          break
        default:
          break
      }
      break
    default:
      const contents = await response.text()
      const html = p.parseFromString(contents, "text/html")
      normalizeRelativeURLs(html, targetUrl)
      
      // 只选择文章正文内容
      const articleEl = html.querySelector("article.popover-hint") as HTMLElement | null
      if (!articleEl) return

      // 解决类型问题：使用 HTMLElement 而不是具体的 HTMLDivElement
      let contentToShow: HTMLElement = document.createElement("div")
      
      // 处理锚点链接
      if (hash) {
        try {
          const anchorId = decodeURIComponent(hash.slice(1))
          const targetEl = articleEl.querySelector(`#${anchorId}`) as HTMLElement | null
          
          if (targetEl) {
            // 克隆目标元素
            const targetClone = targetEl.cloneNode(true) as HTMLElement
            contentToShow.appendChild(targetClone)
            
            // 获取标题层级 (h1-h6)
            const headerMatch = targetEl.tagName.match(/H([1-6])/i)
            if (headerMatch) {
              const targetLevel = parseInt(headerMatch[1])
              let nextEl: Element | null = targetEl.nextElementSibling
              
              // 遍历后续元素直到遇到同/高级标题
              while (nextEl) {
                // 检查标题级别
                const nextHeaderMatch = nextEl.tagName.match(/H([1-6])/i)
                if (nextHeaderMatch) {
                  const nextLevel = parseInt(nextHeaderMatch[1])
                  if (nextLevel <= targetLevel) break
                }
                
                // 克隆并添加到内容
                const clone = nextEl.cloneNode(true) as HTMLElement
                contentToShow.appendChild(clone)
                nextEl = nextEl.nextElementSibling
              }
            }
          } else {
            console.warn(`未找到锚点元素: #${anchorId}`)
          }
        } catch (e) {
          console.error("处理锚点时出错:", e)
        }
      }
      
      // 回退逻辑：如果没有锚点或未找到目标内容，显示完整文章
      if (!hash || contentToShow.children.length === 0) {
        contentToShow = articleEl.cloneNode(true) as HTMLElement
      }

      // 处理ID避免冲突
      contentToShow.querySelectorAll("[id]").forEach((el) => {
        const targetID = `popover-internal-${el.id}`
        el.id = targetID
      })
      
      // 清空容器并添加新内容
      while (popoverInner.firstChild) {
        popoverInner.removeChild(popoverInner.firstChild)
      }
      popoverInner.appendChild(contentToShow)

      // const elts = [...html.getElementsByClassName("popover-hint")]
      // if (elts.length === 0) return

      // elts.forEach((elt) => popoverInner.appendChild(elt))
  }

  if (!!document.getElementById(popoverId)) {
    return
  }

  document.body.appendChild(popoverElement)
  if (activeAnchor !== this) {
    return
  }

  showPopover(popoverElement)
}

function clearActivePopover() {
  activeAnchor = null
  const allPopoverElements = document.querySelectorAll(".popover")
  allPopoverElements.forEach((popoverElement) => popoverElement.classList.remove("active-popover"))
}

document.addEventListener("nav", () => {
  const links = [...document.querySelectorAll("a.internal")] as HTMLAnchorElement[]
  for (const link of links) {
    link.addEventListener("mouseenter", mouseEnterHandler)
    link.addEventListener("mouseleave", clearActivePopover)
    window.addCleanup(() => {
      link.removeEventListener("mouseenter", mouseEnterHandler)
      link.removeEventListener("mouseleave", clearActivePopover)
    })
  }
})
