export const types = ['img', 'bg-image', 'icon'] as const
export type ImageType = (typeof types)[number]

export type ImageData = {
  type: ImageType
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

  const iconElements = document.querySelectorAll('img[src$=".svg"], img[src$=".ico"]')
  iconElements.forEach((el) => {
    const src = (el as HTMLImageElement).src

    if (src && !images.some((image) => image.src === src)) {
      images.push({type: 'icon', src})
    }
  })

  const inlineSvgElements = document.querySelectorAll('svg')
  inlineSvgElements.forEach((el) => {
    const svgString = new XMLSerializer().serializeToString(el)
    const dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString)

    if (!images.some((image) => image.src === dataUri)) {
      images.push({type: 'icon', src: dataUri})
    }
  })

  return images
}
