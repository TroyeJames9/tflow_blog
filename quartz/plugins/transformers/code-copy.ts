import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

interface CodeCopyOptions {
  successText?: string
  duration?: number
}

const defaultOptions: CodeCopyOptions = {
  successText: "✓ 复制成功!",
  duration: 2000,
}

export const CodeCopy: QuartzTransformerPlugin<CodeCopyOptions> = (userOpts?: CodeCopyOptions) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "CodeCopy",
    externalResources() {
      return {
        css: [
          {
            // CSS使用content而非script
            content: `
              div.code-copy-notification {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 10px 20px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                border-radius: 4px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
                pointer-events: none;
              }
              
              div.code-copy-notification.show {
                opacity: 1;
              }
              
              pre {
                cursor: pointer;
                transition: all 0.2s;
              }
              
              pre:hover {
                border-color: var(--lightgray);
                background-color: rgba(0, 0, 0, 0.02);
              }
            `,
            // 仅需设置inline属性
            inline: true,
          },
        ],
        js: [
          {
            // JS内联脚本必须使用script属性而非content
            script: `
              function showNotification(text, duration) {
                // 创建或获取通知元素
                let notification = document.querySelector('.code-copy-notification');
                if (!notification) {
                  notification = document.createElement('div');
                  notification.className = 'code-copy-notification';
                  document.body.appendChild(notification);
                }
                
                // 设置通知内容
                notification.textContent = text;
                notification.classList.add('show');
                
                // 自动隐藏
                setTimeout(() => {
                  notification.classList.remove('show');
                }, duration);
              }
              
              function initCodeCopy() {
                document.removeEventListener('DOMContentLoaded', initCodeCopy);
                document.removeEventListener('nav', initCodeCopy);
                
                const allCodeBlocks = document.querySelectorAll('pre');
                allCodeBlocks.forEach(block => {
                  block.removeEventListener('click', handleCodeBlockClick);
                  block.addEventListener('click', handleCodeBlockClick);
                });
              }
              
              function handleCodeBlockClick(e) {
                const codeBlock = e.currentTarget;
                
                // 获取代码块内容
                const codeEl = codeBlock.querySelector('code');
                if (!codeEl) return;
                
                const text = codeEl.textContent || '';
                
                // 复制到剪贴板
                navigator.clipboard.writeText(text)
                  .then(() => {
                    // 显示成功提示
                    showNotification('${opts.successText}', ${opts.duration});
                    
                    // 高亮效果
                    codeBlock.style.backgroundColor = 'var(--lightgray)';
                    setTimeout(() => {
                      codeBlock.style.backgroundColor = '';
                    }, 300);
                  })
                  .catch(err => {
                    console.error('复制失败:', err);
                    showNotification('❌ 复制失败', ${opts.duration});
                  });
              }
              
              // 初始化 - 使用vfile的spa事件系统
              document.addEventListener('nav', initCodeCopy);
              document.addEventListener('DOMContentLoaded', initCodeCopy);
            `,
            // 使用这些属性确保类型匹配
            contentType: "inline",
            loadTime: "afterDOMReady",
          },
        ],
      }
    },
    htmlPlugins() {
      return [() => {
        return (tree: any) => {
          visit(tree, "element", (node: any) => {
            if (node.tagName === "pre") {
              // 添加类名用于识别
              node.properties.className = 
                [...(node.properties.className ?? []), "code-block"];
              node.properties.tabindex = "0";
            }
          })
        }
      }]
    }
  }
}