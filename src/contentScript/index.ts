import {type FontData, fontsExtractor} from '_scripts/fontsExtractor'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'EXTRACT_UNITS') {
    sendResponse({
      ...fontsExtractor(),
    })
  }
})
