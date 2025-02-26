import {type FontData, fontsExtractor} from '_scripts/fontsExtractor'
import {type ColorData, colorsExtractor} from '_scripts/colorsExtractor'
import {type ImageData, imagesExtractor} from '_scripts/imagesExtractor'

export type Units = {
  fonts: FontData[]
  colors: ColorData[]
  images: ImageData[]
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'EXTRACT_UNITS':
      sendResponse({
        fonts: fontsExtractor(),
        colors: colorsExtractor(),
        images: imagesExtractor(),
      } as Units)
      break

    case 'EXTRACT_COLORS':
      sendResponse({
        colors: colorsExtractor(),
      })
      break

    case 'EXTRACT_IMAGES':
      sendResponse({
        images: imagesExtractor(),
      })
      break
  }
})
