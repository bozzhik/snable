import type {ColorData} from '_scripts/colorsExtractor'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import ColorsUnit from '~~popup/details/ColorsUnit'

type ColorsResponse = {
  colors: ColorData[]
}

export function Colors() {
  const [colorsData, setColorsData] = useState<ColorsResponse>()

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'EXTRACT_COLORS'}, (response: ColorsResponse) => {
        if (response) {
          setColorsData(response)
        }
      })
    })
  }, [])

  return (
    <Layout className="space-y-2.5">
      <ColorsUnit data={colorsData?.colors} />
    </Layout>
  )
}
