import type {FontData} from '_scripts/fontsExtractor'
import {FONT_WEIGHTS} from '@/lib/constants'
import {useState} from 'react'

import {cn} from '@/lib/utils'

import Unit, {unitStyles} from '~/UI/Unit'
import {H2, H3} from '~/UI/Typography'
import NotFound from '~/UI/NotFound'
import Button from '~/UI/Button'

export default function FontsUnit({data}: {data: FontData[] | undefined}) {
  const [inspectedFont, setInspectedFont] = useState<string | null>(null)

  const handleInspectFont = (font: string) => {
    if (inspectedFont === font) {
      setInspectedFont(null)
      // Remove highlights
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id!, {type: 'REMOVE_FONT_HIGHLIGHT'})
      })
    } else {
      setInspectedFont(font)
      // Add highlights for new font
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id!, {type: 'HIGHLIGHT_FONT', font})
      })
    }
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Unit token="fonts">
        <NotFound>No fonts detected</NotFound>
      </Unit>
    )
  }

  return (
    <Unit token="fonts" className={cn('p-0 bg-transparent', 'space-y-2')}>
      {Object.values(data)
        .slice(0, 3)
        .map(({font, weights}) => (
          <div key={font} className={cn(unitStyles, 'px-2.5 py-1.5')}>
            <div className="flex items-center justify-between">
              <H2 className="first-letter:uppercase">{font}</H2>
              <Button variant={inspectedFont === font ? 'primary' : 'secondary'} onClick={() => handleInspectFont(font)}>
                {inspectedFont === font ? 'Stop' : 'Inspect'}
              </Button>
            </div>

            <div className="flex gap-1.5">
              {weights.map((weight) => (
                <H3 key={weight}>{FONT_WEIGHTS[weight] || weight}</H3>
              ))}
            </div>
          </div>
        ))}
    </Unit>
  )
}
