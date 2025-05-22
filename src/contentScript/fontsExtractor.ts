export type FontData = {
  font: string
  weights: string[]
}

const fallbackFonts = new Set(['sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'ui-rounded', '-apple-system', 'BlinkMacSystemFont', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'])

const systemFonts = new Set(['Helvetica', 'Arial', 'Georgia', 'Cambria', 'SFMono-Regular', 'Times New Roman', 'Times', 'Consolas', 'Liberation Mono', 'Courier New', 'Menlo', 'Monaco'])

function normalizeFontName(font: string): string {
  return font.replace(/\s+/g, '').toLowerCase()
}

const fallbackFontsNormalized = new Set(Array.from(fallbackFonts).map((font) => normalizeFontName(font)))
const systemFontsNormalized = new Set(Array.from(systemFonts).map((font) => normalizeFontName(font)))

export function fontsExtractor(): FontData[] {
  const elements = document.querySelectorAll('*')
  const customFonts = new Map<string, Set<string>>()

  // First pass: collect all custom fonts
  elements.forEach((el) => {
    const styles = window.getComputedStyle(el)
    const fontFamily = styles.fontFamily
    const fontWeight = styles.fontWeight

    if (fontFamily) {
      const fonts = fontFamily.split(',')

      for (const font of fonts) {
        const cleanFont = font.trim().replace(/['"]/g, '')
        const normalizedFont = normalizeFontName(cleanFont)

        if (cleanFont.includes('Emoji') || cleanFont.includes('Symbol')) {
          continue
        }

        // Only collect custom fonts (non-fallback, non-system)
        if (!fallbackFontsNormalized.has(normalizedFont) && !systemFontsNormalized.has(normalizedFont)) {
          const cleanedFont = cleanFontName(cleanFont)
          if (!customFonts.has(cleanedFont)) {
            customFonts.set(cleanedFont, new Set())
          }
          customFonts.get(cleanedFont)!.add(fontWeight)
          break // Stop after finding first custom font
        }
      }
    }
  })

  // If no custom fonts found, do a second pass for system fonts
  if (customFonts.size === 0) {
    const systemFontsFound = new Map<string, Set<string>>()

    elements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      const fontFamily = styles.fontFamily
      const fontWeight = styles.fontWeight

      if (fontFamily) {
        const fonts = fontFamily.split(',')

        for (const font of fonts) {
          const cleanFont = font.trim().replace(/['"]/g, '')
          const normalizedFont = normalizeFontName(cleanFont)

          if (systemFontsNormalized.has(normalizedFont)) {
            const cleanedFont = cleanFontName(cleanFont)
            if (!systemFontsFound.has(cleanedFont)) {
              systemFontsFound.set(cleanedFont, new Set())
            }
            systemFontsFound.get(cleanedFont)!.add(fontWeight)
            break // Stop after finding first system font
          }
        }
      }
    })

    return Array.from(systemFontsFound.entries()).map(([font, weights]) => ({
      font,
      weights: Array.from(weights).sort(),
    }))
  }

  return Array.from(customFonts.entries()).map(([font, weights]) => ({
    font,
    weights: Array.from(weights).sort(),
  }))
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
