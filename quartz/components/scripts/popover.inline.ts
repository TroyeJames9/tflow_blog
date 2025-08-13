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
      
      // 1. 只选择文章正文内容
      const articleEl = html.querySelector("article.popover-hint")
      if (!articleEl) return

      // 如果有锚点指定小标题
      let targetEl: HTMLElement | null = null
      if (hash) {
        const targetAnchor = `#popover-internal-${decodeURIComponent(hash.slice(1))}`
        targetEl = articleEl.querySelector(targetAnchor)
      }

      let contentToShow: HTMLElement | null = null
      
      if (targetEl) {
        // 2. 为锚点选择器创建临时容器
        contentToShow = document.createElement("div")
        
        // 3. 添加目标标题及后续内容
        let currentNode: Element | null = targetEl
        
        // 计算目标标题的层级（h1-h6）
        const targetLevel = parseInt(targetEl.tagName.charAt(1))
        
        while (currentNode) {
          // 4. 遇到同级或更高级别标题则停止（跳过内容开头）
          if (currentNode !== targetEl && currentNode.tagName.match(/H[1-6]/i)) {
            const currentLevel = parseInt(currentNode.tagName.charAt(1))
            if (currentLevel <= targetLevel) break
          }
          
          // 5. 克隆节点并添加到临时容器
          const clone = currentNode.cloneNode(true)
          contentToShow.appendChild(clone)
          
          // 6. 继续处理后续节点
          currentNode = currentNode.nextElementSibling
          
          // 7. 如果已到article末尾，则停止
          if (currentNode && !articleEl.contains(currentNode)) break
        }
      } else {
        // 没有指定锚点时直接使用整个文章
        contentToShow = articleEl.cloneNode(true) as HTMLElement
      }
      
      // 8. 内容为空时返回
      if (!contentToShow || contentToShow.children.length === 0) return

      // 9. 处理ID避免冲突
      contentToShow.querySelectorAll("[id]").forEach((el) => {
        const targetID = `popover-internal-${el.id}`
        el.id = targetID
      })
      
      // 10. 添加到预览容器
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
