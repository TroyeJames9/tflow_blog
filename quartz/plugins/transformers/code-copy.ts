import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { JSResource } from "../../util/resources"

interface Options {
  copyText?: string
  successDuration?: number
}

const defaultOptions: Options = {
  copyText: "复制代码",
  successDuration: 2000
}

export const CodeCopy: QuartzTransformerPlugin<Options> = (userOpts?: Options) => {
  const opts = { ...defaultOptions, ...userOpts }
  
  return {
    name: "CodeCopy",
    htmlPlugins() {
      return [() => {
        return (tree: any) => {
          visit(tree, "element", (node: any) => {
            if (node.tagName === "pre") {
              let wrapperClass = "code-copy-wrapper"
              let notificationClass = "copy-notification"
              
              // 添加属性
              node.properties.className = node.properties.className || []
              node.properties.className.push(wrapperClass)
              
              // 创建复制按钮元素
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
              
              // 创建通知元素
              const notification = {
                type: "element",
                tagName: "div",
                properties: { className: [notificationClass] },
                children: [{ type: "text", value: "✓ 已复制!" }]
              }
              
              // 添加元素到代码块
              node.children = [copyBtn, notification, ...node.children]
            }
          })
        }
      }]
    },
    externalResources() {
      // 修改此处以符合资源类型定义
      return {
        js: [
          {
            script: `
              document.addEventListener('DOMContentLoaded', () => {
                if (!window.quartzCodeCopyInitialized) {
                  window.quartzCodeCopyInitialized = true
                  
                  document.addEventListener('click', async (e) => {
                    const btn = e.target.closest('.copy-btn')
                    if (!btn) return
                    
                    const wrapper = btn.parentElement
                    const codeEl = wrapper.querySelector('code')
                    
                    try {
                      await navigator.clipboard.writeText(codeEl.textContent)
                      
                      const notification = btn.nextElementSibling
                      notification.style.display = 'block'
                      
                      setTimeout(() => {
                        notification.style.display = ''
                      }, ${opts.successDuration})
                    } catch (err) {
                      console.error('复制失败:', err)
                    }
                  })
                }
              })
            `,
            loadTime: "afterDOMReady" as const,  // 使用常量类型
            contentType: "inline" as const,
          } satisfies JSResource  // 确保类型匹配
        ],
        css: [
          {
            content: `
              .code-copy-wrapper {
                position: relative;
              }
              
              .copy-btn {
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 4px 8px;
                font-size: 0.8rem;
                border-radius: 4px;
                cursor: pointer;
                background: var(--darkgray);
                color: white;
                opacity: 0;
                transition: opacity 0.2s;
                z-index: 10;
              }
              
              .code-copy-wrapper:hover .copy-btn {
                opacity: 1;
              }
              
              .copy-notification {
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 4px 8px;
                font-size: 0.8rem;
                color: white;
                border-radius: 4px;
                display: none;
                z-index: 20;
                background-color: var(--secondary);
              }
            `,
            contentType: "inline" as const,
          }
        ]
      }
    }
  }
}