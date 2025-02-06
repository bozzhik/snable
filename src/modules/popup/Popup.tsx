import type {Units} from '_scripts/index'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import FontsUnit from '~~popup/FontsUnit'
import ColorsUnit from '~~popup/ColorsUnit'

export function Popup() {
  const [fonts, setFonts] = useState<Units['fonts']>()
  const [colors, setColors] = useState<Units['colors']>()

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'EXTRACT_UNITS'}, (response: Units) => {
        if (!response) return
        setFonts(response.fonts)
        setColors(response.colors)
      })
    })
  }, [])

  return (
    <Layout className="space-y-2.5">
      <FontsUnit data={fonts} />
      <ColorsUnit data={colors} />
    </Layout>
  )
}
