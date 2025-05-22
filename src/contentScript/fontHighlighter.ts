let highlightedElements: HTMLElement[] = []

function injectHighlightStyle() {
  if (document.getElementById('snable-font-highlight-style')) return
  const style = document.createElement('style')
  style.id = 'snable-font-highlight-style'
  style.textContent = `
    .snable-font-highlight {
      outline: 2px solid #818181 !important;
      outline-offset: 2px !important;
      border-radius: 2px !important;
      pointer-events: none !important;
      user-select: none !important;
      transition: outline 0.3s ease-in-out !important;
    }
  `
  document.head.appendChild(style)
}

function hasDirectTextNode(el: Element): boolean {
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim().length > 0) {
      return true
    }
  }
  return false
}

function highlightElementsWithFont(font: string) {
  // First remove any existing highlights
  removeHighlights()
  injectHighlightStyle()

  const elements = document.querySelectorAll('*')
  elements.forEach((el) => {
    const styles = window.getComputedStyle(el)
    const fontFamily = styles.fontFamily

    if (fontFamily) {
      const fonts = fontFamily
        .split(',')
        .map((f) => f.trim().replace(/['"]/g, ''))
        .filter((f) => f.toLowerCase() === font.toLowerCase())

      if (fonts.length > 0 && hasDirectTextNode(el)) {
        const element = el as HTMLElement
        element.classList.add('snable-font-highlight')
        highlightedElements.push(element)
      }
    }
  })
}

function removeHighlights() {
  highlightedElements.forEach((el) => {
    el.classList.remove('snable-font-highlight')
  })
  highlightedElements = []
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'HIGHLIGHT_FONT') {
    highlightElementsWithFont(message.font)
  } else if (message.type === 'REMOVE_FONT_HIGHLIGHT') {
    removeHighlights()
  }
})
