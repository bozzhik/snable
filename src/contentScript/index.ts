import {type FontData, fontsExtractor} from '_scripts/fontsExtractor'
import {type ColorData, colorsExtractor} from '_scripts/colorsExtractor'

export type Units = {
  fonts: FontData[]
  colors: ColorData[]
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'EXTRACT_UNITS':
      sendResponse({
        fonts: fontsExtractor(),
        colors: colorsExtractor(),
      } as Units)
      break

    case 'EXTRACT_COLORS':
      sendResponse({
        colors: colorsExtractor(),
      })
      break
  }
})
