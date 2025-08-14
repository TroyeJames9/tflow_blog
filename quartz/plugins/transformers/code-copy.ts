import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { JSResource } from "../../util/resources"

interface Options {
  copyText?: string
  successDuration?: number
}

const defaultOptions: Options = {
  copyText: "复制",
  successDuration: 2500
}

export const CodeCopy: QuartzTransformerPlugin<Options> = (userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "CodeCopy",
    htmlPlugins() {
      return [() => {
        return (tree: any) => {
          visit(tree, "element", (node: any) => {
            // 定位包含代码块的pre容器
            if (node.tagName === "pre" && node.children?.some((c: any) => c.tagName === "code")) {
              // 添加包装容器类
              node.properties.className = node.properties.className || []
              node.properties.className.push("code-copy-wrapper")
              
              // 查找已有的按钮避免重复添加
              const hasCopyBtn = node.children.some((c: any) => 
                c.properties?.className?.includes("copy-btn")
              )
              
              if (hasCopyBtn) return
              
              // 创建复制按钮
              const copyBtn = {
                type: "element",
                tagName: "div",
                properties: { 
                  className: ["copy-btn"],
                  tabindex: "0",
                  role: "button",
                  "aria-label": "复制代码"
                },
                children: [{ type: "text", value: opts.copyText }]
              }

              // 创建通知元素（最初隐藏）
              const notification = {
                type: "element",
                tagName: "div",
                properties: { 
                  className: ["copy-notification"],
                  style: "display:none;" // 初始隐藏
                },
                children: [{ type: "text", value: "✓ 已复制!" }]
              }

              // 插入到代码块的第一个位置
              node.children.unshift(notification)
              node.children.unshift(copyBtn)
            }
          })
        }
      }]
    },
    externalResources() {
      return {
        js: [
          {
            script: `
              document.addEventListener('DOMContentLoaded', () => {
                if (window.quartzCodeCopyInitialized) return
                window.quartzCodeCopyInitialized = true
                
                document.addEventListener('click', async (e) => {
                  const btn = e.target.closest('.copy-btn')
                  if (!btn) return
                  
                  const wrapper = btn.parentElement
                  const codeEl = wrapper.querySelector('code')
                  
                  if (!codeEl) {
                    console.error('无法找到代码元素')
                    return
                  }
                  
                  try {
                    await navigator.clipboard.writeText(codeEl.textContent)
                    
                    // 使用类名查找更可靠
                    const notification = wrapper.querySelector('.copy-notification')
                    if (!notification) {
                      console.warn('找不到通知元素')
                      return
                    }
                    
                    notification.style.display = 'block'
                    setTimeout(() => {
                      notification.style.display = 'none'
                    }, ${opts.successDuration})
                  } catch (err) {
                    console.error('复制失败:', err)
                  }
                })
              })
            `,
            loadTime: "afterDOMReady" as const,
            contentType: "inline" as const,
            moduleType: "module" as const
          } satisfies JSResource
        ],
        css: [
          {
            content: `
              .code-copy-wrapper {
                position: relative !important;
                overflow: visible !important;
              }
              
              .copy-btn {
                position: absolute !important;
                top: 8px !important;
                right: 8px !important;
                padding: 4px 8px !important;
                font-size: 0.75rem !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                background: var(--darkgray) !important;
                color: var(--light) !important;
                opacity: 0 !important;
                transition: opacity 0.15s ease !important;
                z-index: 50 !important;
              }
              
              .code-copy-wrapper:hover .copy-btn {
                opacity: 1 !important;
              }
              
              .copy-notification {
                position: absolute !important;
                top: 8px !important;
                right: 8px !important;
                padding: 4px 8px !important;
                font-size: 0.75rem !important;
                color: white !important;
                border-radius: 4px !important;
                display: none !important;
                z-index: 60 !important;
                background-color: var(--secondary) !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
              }
            `,
            contentType: "inline" as const
          }
        ]
      }
    }
  }
}