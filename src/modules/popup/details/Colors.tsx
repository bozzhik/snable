import type {ColorData} from '_scripts/colorsExtractor'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import Controls, {ControlsTabItem, CONTROLS_GAP} from '~/UI/Controls'
import Palette from '~~popup/colors/Palette'

const modes = ['hex', 'rgb', 'hsl'] as const
export type ColorMode = (typeof modes)[number]

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
    <Layout className="space-y-3.5 relative">
      <Controls>
        {modes.map((mode) => (
          <ControlsTabItem item={mode} isSelected={mode === colorFormat} onClick={() => handleFormatChange(mode)} key={mode} />
        ))}
      </Controls>

      <Palette data={colorsData} format={colorFormat} className={CONTROLS_GAP} />
    </Layout>
  )
}
