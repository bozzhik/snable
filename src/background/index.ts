import {type TabInfo, getTabData} from '_bg/getTabData'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_TAB_INFO') {
    getTabData()
      .then((tabInfo: TabInfo) => {
        sendResponse(tabInfo)
      })
      .catch((error) => {
        console.error('Error retrieving tab info:', error)
        sendResponse({favicon: null, url: '', title: ''})
      })
    return true // async response
  }
})
