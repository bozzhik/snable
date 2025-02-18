export type ImageData = {
  type: 'img' | 'bg-image' | 'icon'
  src: string
}

function isSvgImage(src: string): boolean {
  return src.endsWith('.svg') || src.includes('data:image/svg+xml')
}

export function imagesExtractor(): ImageData[] {
  const images: ImageData[] = []

  const imgElements = document.querySelectorAll('img')
  imgElements.forEach((el) => {
    const src = el.src
    if (src && !images.some((image) => image.src === src)) {
      images.push({type: 'img', src})
    }
  })

  const elementsWithBgImage = document.querySelectorAll('*')
  elementsWithBgImage.forEach((el) => {
    const style = window.getComputedStyle(el)
    const bgImage = style.backgroundImage
    if (bgImage && bgImage !== 'none') {
      const match = bgImage.match(/url\((['"]?)(.*?)\1\)/)
      if (match && match[2] && !images.some((image) => image.src === match[2])) {
        images.push({type: 'bg-image', src: match[2]})
      }
    }
  })

  const iconElements = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="icon shortcut"], img[src*="favicon"]')
  iconElements.forEach((el) => {
    const href = el.getAttribute('href')
    if (href && (isSvgImage(href) || href.endsWith('.ico')) && !images.some((image) => image.src === href)) {
      images.push({type: 'icon', src: href})
    }
  })

  return images
}
