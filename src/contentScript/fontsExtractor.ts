export type FontData = {
  font: string
  weights: string[]
}

const fallbackFonts = new Set(['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'ui-rounded', '-apple-system', 'BlinkMacSystemFont'])

const bullshitFonts = new Set(['Arial', 'Times New Roman', 'Helvetica', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Courier New', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Menlo', 'Monaco'])

function normalizeFontName(font: string): string {
  return font.replace(/\s+/g, '').toLowerCase()
}

const fallbackFontsNormalized = new Set(Array.from(fallbackFonts).map((font) => normalizeFontName(font)))

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
        .filter((font) => !fallbackFontsNormalized.has(normalizeFontName(font)))

      fonts.forEach((font) => {
        if (!fontMap.has(font)) {
          fontMap.set(font, new Set())
        }
        fontMap.get(font)!.add(fontWeight)
      })
    }
  })

  const sortedFonts: FontData[] = Array.from(fontMap.entries()).map(([font, weights]) => ({
    font,
    weights: Array.from(weights).sort(),
  }))

  const nonBullshitFonts = sortedFonts.filter((fontData) => !bullshitFonts.has(fontData.font))
  if (nonBullshitFonts.length > 0) {
    return nonBullshitFonts
  }

  return sortedFonts
}

function cleanFontName(font: string): string {
  return (
    font
      // remove any occurrence of "fallback"
      .replace(/Fallback/gi, '')
      // remove 6-character hex codes
      .replace(/[a-f0-9]{6}/gi, '')
      // remove standalone numbers
      .replace(/\b\d+\b/g, '')
      // add space between words in camelCase (e.g., "ClashDisplay" -> "Clash Display")
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // replace underscores with spaces
      .replace(/_/g, ' ')
      // remove excess spaces
      .replace(/\s+/g, ' ')
      .trim()
  )
}
