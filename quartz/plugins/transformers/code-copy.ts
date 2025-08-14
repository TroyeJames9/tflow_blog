import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { JSResource } from "../../util/resources"

interface Options {
  copyText?: string
  successDuration?: number
}

const defaultOptions: Options = {
  copyText: "复制",
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
            // 确保只处理包含代码的pre元素
            if (node.tagName === "pre" && node.children?.some(
              (child: any) => child.tagName === "code"
            )) {
              // 添加包装类
              node.properties.className = [
                ...(node.properties.className || []),
                "code-copy-wrapper"
              ];
              
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
              };
              
              // 创建通知元素
              const notification = {
                type: "element",
                tagName: "div",
                properties: { 
                  className: ["copy-notification"],
                  style: "display: none;" // 初始状态隐藏
                },
                children: [{ type: "text", value: "✓ 已复制!" }]
              };
              
              // 将新元素插入到pre元素的子元素开头
              node.children = [copyBtn, notification, ...node.children];
            }
          });
        };
      }];
    },
    externalResources() {
      return {
        js: [{
          script: `
            document.addEventListener('DOMContentLoaded', () => {
              if (!window.quartzCodeCopyInitialized) {
                window.quartzCodeCopyInitialized = true;
                
                document.addEventListener('click', async (e) => {
                  const btn = e.target.closest('.copy-btn');
                  if (!btn) return;
                  
                  const wrapper = btn.parentElement;
                  const codeEl = wrapper.querySelector('code');
                  
                  if (!codeEl) {
                    console.log('找不到代码元素');
                    return;
                  }
                  
                  try {
                    await navigator.clipboard.writeText(codeEl.textContent);
                    
                    // 使用直接查找方式避免位置依赖
                    const notification = wrapper.querySelector('.copy-notification');
                    notification.style.display = 'block';
                    
                    setTimeout(() => {
                      notification.style.display = 'none';
                    }, ${opts.successDuration});
                  } catch (err) {
                    console.log('复制失败:', err);
                  }
                });
              }
            });
          `,
          loadTime: "afterDOMReady" as const,
          contentType: "inline" as const,
        } satisfies JSResource],
        css: [{
          content: `
            .code-copy-wrapper {
              position: relative!important;
              padding-top: 30px!important; /* 为顶部按钮留出空间 */
            }
            
            .copy-btn {
              position: absolute!important;
              right: 10px!important;
              top: 10px!important; /* 放在顶部 */
              z-index: 100!important;
              padding: 4px 8px!important;
              font-size: 12px!important;
              cursor: pointer!important;
              border-radius: 4px!important;
              background: var(--darkgray)!important;
              color: white!important;
              opacity: 0.7!important;
              transition: opacity 0.2s!important;
              font-family: var(--font-body)!important;
            }
            
            .copy-btn:hover {
              opacity: 1!important;
            }
            
            .copy-notification {
              position: absolute!important;
              right: 10px!important;
              top: 40px!important; /* 在按钮下方 */
              z-index: 101!important;
              padding: 6px 10px!important;
              font-size: 12px!important;
              border-radius: 4px!important;
              background: var(--secondary)!important;
              color: white!important;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2)!important;
              display: none!important;
              font-family: var(--font-body)!important;
            }
          `,
          contentType: "inline" as const,
        }]
      }
    }
  }
}