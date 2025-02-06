import type {FontData} from '_scripts/fontsExtractor'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import FontsUnit from '~~popup/FontsUnit'

export function Popup() {
  const [fonts, setFonts] = useState<FontData[]>()

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'EXTRACT_UNITS'}, (response: FontData[]) => {
        setFonts(response)
      })
    })
  }, [])

  return (
    <Layout>
      <FontsUnit data={fonts} />
    </Layout>
  )
}
