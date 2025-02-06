export type ColorData = {
  color: string
}

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

  return Array.from(colorSet).map((color) => ({color}))
}

function convertToHex(color: string): string | null {
  if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return null

  if (color.startsWith('#')) return color

  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return null

  ctx.fillStyle = color
  return ctx.fillStyle
}
