export const types = ['img', 'bg-image', 'icon'] as const
export type ImageType = (typeof types)[number]

export type ImageData = {
  type: ImageType
  src: string
  name?: string
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

  function cleanIconName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9-_\s]/g, '') // remove special characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .toLowerCase()
      .trim()
  }

  const inlineSvgElements = document.querySelectorAll('svg')
  inlineSvgElements.forEach((el) => {
    const svgString = new XMLSerializer().serializeToString(el)
    const blob = new Blob([svgString], {type: 'image/svg+xml'})
    const dataUri = URL.createObjectURL(blob)

    let iconName = el.getAttribute('id') || el.getAttribute('data-name') || el.getAttribute('aria-label') || el.querySelector('title')?.textContent || 'icon'

    const name = cleanIconName(iconName)

    if (!images.some((image) => image.src === dataUri)) {
      images.push({
        type: 'icon',
        src: dataUri,
        name,
      })
    }
  })

  return images
}
