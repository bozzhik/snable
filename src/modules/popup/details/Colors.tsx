import type {ColorData} from '_scripts/colorsExtractor'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import Palette from '~~popup/colors/Palette'
import Controls, {type ColorMode} from '~~popup/colors/Controls'

export type ColorsResponse = {
  colors: ColorData[]
}

export function Colors() {
  const [colorsData, setColorsData] = useState<ColorsResponse>()
  const [colorFormat, setColorFormat] = useState<ColorMode>('hex')

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'EXTRACT_COLORS'}, (response: ColorsResponse) => {
        if (response) {
          setColorsData(response)
        }
      })
    })
  }, [])

  const handleFormatChange = (format: ColorMode) => {
    setColorFormat(format)
  }

  return (
    <Layout className="space-y-3.5">
      <Controls selectedMode={colorFormat} onModeChange={handleFormatChange} />
      <Palette data={colorsData} format={colorFormat} />
    </Layout>
  )
}
