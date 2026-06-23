// Reading a layout property forces the browser to flush pending style changes.
// That synchronous reflow is what lets a CSS animation or transition replay
// after a class is removed and re-added within the same tick.
export function forceReflow(element: HTMLElement): void {
  element.getBoundingClientRect()
}
