export type TabInfo = {
  favicon: string | null
  url: string
  title: string
}

export function getTabData(): Promise<TabInfo> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0]
      if (tab) {
        const favicon = tab.favIconUrl || null
        const url = tab.url || ''
        const title = tab.title || ''

        resolve({favicon, url, title})
      } else {
        reject('No active tab found')
      }
    })
  })
}
