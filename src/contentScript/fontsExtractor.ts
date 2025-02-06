export type FontData = {
  font: string
  weights: string[]
}

const ignoredFonts = new Set(['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'ui-rounded', '-apple-system', 'BlinkMacSystemFont', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'])

export function fontsExtractor(): FontData[] {
  const elements = document.querySelectorAll('*')
  const fontMap = new Map<string, Set<string>>()

  elements.forEach((el) => {
    const styles = window.getComputedStyle(el)
    const fontFamily = styles.fontFamily
    const fontWeight = styles.fontWeight

    if (fontFamily) {
      const fonts = fontFamily
        .split(',')
        .map((font) => cleanFontName(font.trim().replace(/['"]/g, '')))
        .filter((font) => !ignoredFonts.has(font))

      fonts.forEach((font) => {
        const baseFont = font.replace(/\bFallback\b/, '').trim()

        if (!fontMap.has(baseFont)) {
          fontMap.set(baseFont, new Set())
        }
        fontMap.get(baseFont)!.add(fontWeight)
      })
    }
  })

  const sortedFonts: FontData[] = Array.from(fontMap.entries()).map(([font, weights]) => ({
    font,
    weights: Array.from(weights).sort(),
  }))

  return sortedFonts
}

function cleanFontName(font: string): string {
  return font
    .replace(/_Fallback$/, '')
    .replace(/_\d+$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .trim()
}
