# seciton A
## **Describe the bug**
When hovering over multiple links pointing to different headings within the same page, the preview popover retains its previous scroll position rather than scrolling to the new target heading. Specifically, after previewing one heading on a page, hovering over another link to a different heading on that same page will still show the previously viewed section in the popover.

## **To Reproduce**
Steps to reproduce the behavior:

1. Create a page "Cited page" with two headings: `# Section A` and `# Section B`
2. Add two links on another page “citing page"  `[Link A](cited%20page.md#Section%20A)` and `[Link B](cited%20page.md#Section%20B)`
3. First hover over "Link A" - popup correctly shows Section A at top
4. move cursor to "Link B"
5. Popover remains showing Section A instead of scrolling to Section B

## **Expected behavior**
Popover should always scroll to display the heading corresponding to the currently hovered link. When previewing a new heading on the same page, the popover should automatically scroll to make that heading visible.

## **Screenshots and Source**

The following screenshots were taken on the same webpage

![Image](https://github.com/user-attachments/assets/24e00115-5b1c-4049-9f40-6db09fd7ab9a)
![Image](https://github.com/user-attachments/assets/f688ef92-8bdb-421c-9c9a-ecabc86cc3f9)

I can provide a PR to fix this issue. The bug exists in the popover preview functionality script (`quartz/components/scripts/popover.inline.ts`) due to stale DOM references.

Fixed code with explanation:

```ts 
function showPopover(popoverElement: HTMLElement) {
    clearActivePopover()
    popoverElement.classList.add("active-popover")
    setPosition(popoverElement as HTMLElement)

	// START
	// In showPopover function - add these lines:
	// ensures we always operate on the live DOM element rather than a closed-over variable reference
    const popoverInner = popoverElement.querySelector('.popover-inner') as HTMLElement | null;
    if (!popoverInner) return;
    // EMD
    
    if (hash !== "") {
      const targetAnchor = `#popover-internal-${hash.slice(1)}`
      const heading = popoverInner.querySelector(targetAnchor) as HTMLElement | null
      if (heading) {
        // leave ~12px of buffer when scrolling to a heading
        popoverInner.scroll({ top: heading.offsetTop - 12, behavior: "instant" })
      }
    }
  }
```

## **Desktop (please complete the following information):**

- Quartz Version: v4.5.1
- `node` Version: v22.17.0
- `npm` version: 10.9.2
- OS: Win10 Home
- Browser: Chrome 139.0.7258.67

# section B

## **Additional context**
- Problem occurs because the component uses a cached DOM element reference that becomes stale when the same popup is reused
- The solution ensures we always operate on the live DOM element rather than a closed-over variable reference
- I have tested the fix locally and confirmed it resolves the scrolling issue without side effects
- Ready to submit a PR if accepted
