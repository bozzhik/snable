import {type TabInfo} from '_bg/getTabData'
import {BOX_STYLES} from '~/Global/Container'

import {useEffect, useState} from 'react'
import {cn} from '@/lib/utils'

import Button from '~/UI/Button'

export default function Header() {
  const [tabData, setTabData] = useState<TabInfo>({
    favicon: null,
    url: '',
    title: '',
  })

  useEffect(() => {
    chrome.runtime.sendMessage({type: 'GET_TAB_INFO'}, (response) => {
      setTabData(response)
    })
  }, [])

  return (
    <div className={cn(BOX_STYLES, 'py-3 flex justify-between border-b-3 border-control')}>
      <div className={cn('size-10 bg-control rounded-lg p-2', 'group')}>
        <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300')}></div>
      </div>

      <div className="flex items-center gap-2">
        <div className="size-5 flex items-center justify-center rounded-sm bg-gray-200">
          {tabData.favicon ? (
            <img src={tabData.favicon} alt="Favicon" className="size-full rounded-sm" />
          ) : (
            <span className="text-xs text-gray-500">🌐</span> // Placeholder icon
          )}
        </div>

        <div>
          {tabData.title && <p className="text-sm font-medium">{tabData.title}</p>}
          {tabData.url && <p className="text-xs text-gray-500">{tabData.url}</p>}
        </div>
      </div>

      <Button variant="secondary">Button</Button>
    </div>
  )
}
