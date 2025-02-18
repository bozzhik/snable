export type ColorData = {
  color: string
  isContrasted: boolean
}

const UNIT_COLOR = '#191919'

export function colorsExtractor(): ColorData[] {
  const elements = document.querySelectorAll('*')
  const colorSet = new Set<string>()

  elements.forEach((el) => {
    const styles = window.getComputedStyle(el)

    const colors = [styles.color, styles.backgroundColor, styles.borderColor]

    colors.forEach((color) => {
      const hexColor = convertToHex(color)
      if (hexColor) {
        colorSet.add(hexColor)
      }
    })
  })

  return Array.from(colorSet).map((color) => ({
    color,
    isContrasted: isColorContrasted(color, UNIT_COLOR),
  }))
}

function convertToHex(color: string): string | null {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return null

  if (color.startsWith('#')) {
    if (color.length === 4) {
      return (
        '#' +
        color
          .slice(1)
          .split('')
          .map((ch) => ch + ch)
          .join('')
          .toLowerCase()
      )
    }
    return color.toLowerCase()
  }

  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return null
  ctx.fillStyle = color
  let computed = ctx.fillStyle

  if (!computed.startsWith('#')) {
    const match = computed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/)
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0')
      const g = parseInt(match[2]).toString(16).padStart(2, '0')
      const b = parseInt(match[3]).toString(16).padStart(2, '0')
      let hex = `#${r}${g}${b}`

      if (match[4] !== undefined) {
        const a = Math.round(parseFloat(match[4]) * 255)
          .toString(16)
          .padStart(2, '0')
        hex = `#${r}${g}${b}${a}`
      }
      computed = hex
    } else {
      return null
    }
  }
  return computed
}

function getLuminance(color: string): number {
  const hex = color.startsWith('#') ? color.slice(1) : color
  const rgb = parseInt(hex, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff

  const [rNorm, gNorm, bNorm] = [r, g, b].map((c) => {
    const cNorm = c / 255
    return cNorm <= 0.03928 ? cNorm / 12.92 : Math.pow((cNorm + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm
}

function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1)
  const luminance2 = getLuminance(color2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

function isColorContrasted(color: string, bgColor: string, threshold: number = 4.5): boolean {
  return getContrastRatio(color, bgColor) >= threshold
}
