import { QuartzTransformerPlugin } from "../types"

// ViewImage.js灯箱插件
// 简化版实现
export const ViewImage: QuartzTransformerPlugin = () => {
  return {
    name: "ViewImage",
    externalResources() {
      return {
        js: [
          {
            src: "https://cdn.jsdelivr.net/gh/Tokinx/ViewImage/view-image.min.js",
            loadTime: "afterDOMReady",
            contentType: "external",
          },
          {
            script: `
              // 1. 永久样式只注入一次
              if (!document.querySelector('style[data-viewimage-css]')) {
                const style = document.createElement('style');
                style.textContent = 'article img, .content img { cursor: zoom-in; border: 2px dashed #284b63; }';
                style.dataset.viewimageCss = 'true';
                document.head.appendChild(style);
              }
              
              // 2. 高效的重用初始化函数
              function initImages() {
                const uninitialized = document.querySelectorAll(
                  'img:not([data-viewimage-init]), [data-has-linked-img] img:not([data-viewimage-init])'
                );
                
                uninitialized.forEach(img => {
                  ViewImage.init(img);
                  img.setAttribute('data-viewimage-init', 'true');
                });
              }
              
              // 3. 初始化和SPA导航支持
              document.addEventListener('DOMContentLoaded', initImages);
              document.addEventListener('nav', initImages); // Quartz特定事件
              
              // 4. 性能优化的MutationObserver（仅内容区域）
              const contentObserver = () => {
                const contentArea = document.querySelector('.content, article') || document.body;
                const observer = new MutationObserver(initImages);
                
                // 小功能：防抖避免频繁调用
                let debounceTimer;
                const debouncedInit = () => {
                  clearTimeout(debounceTimer);
                  debounceTimer = setTimeout(initImages, 30);
                };
                
                observer.observe(contentArea, {
                  childList: true,
                  subtree: true,
                  attributes: false
                });
              };
              contentObserver();
            `,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
      }
    },
  }
}

// 告诉TypeScript我们添加的内容
declare module "vfile" {
  interface DataMap {
    viewImage?: boolean
  }
}