import {type TabInfo} from '_bg/getTabData'
import {BOX_STYLES} from '~/Global/Container'

import {useEffect, useState} from 'react'
import {cn} from '@/lib/utils'

import {X, Ban, Star} from 'lucide-react'
import Button from '~/UI/Button'
import {H3, SPAN} from '~/UI/Typography'

export const ITEMS_STYLE = {
  box: 'size-[42px] bg-control rounded-lg grid place-items-center',
  icon: 'text-gray group-hover:text-white group-hover:scale-[1.05] duration-300',
}

export default function Header() {
  const [tabData, setTabData] = useState<TabInfo>({} as TabInfo)

  useEffect(() => {
    chrome.runtime.sendMessage({type: 'GET_TAB_INFO'}, (response) => {
      setTabData(response)
    })
  }, [])

  function getDomain(url: string): string {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  return (
    <header className={cn(BOX_STYLES, 'fixed z-[99] w-full', 'py-3 flex justify-between bg-[#121212f7] backdrop-blur-sm border-b-3 border-control')}>
      <div className="flex items-center gap-1">
        <div className={cn(ITEMS_STYLE.box, 'p-2 group')}>
          <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300')}></div>
        </div>

        <X className="size-4 text-gray" />

        <div className="flex items-center gap-3">
          <div className={cn(ITEMS_STYLE.box, 'bg-transparent overflow-hidden')}>
            {tabData.favicon ? (
              <img src={tabData.favicon} className="size-full" alt="website favicon" />
            ) : (
              <div className={cn(ITEMS_STYLE.box, 'bg-control p-2 group')}>
                <Ban className={cn(ITEMS_STYLE.icon, 'size-6')} />
              </div>
            )}
          </div>

          <div className="-space-y-0.5">
            {tabData.title && <H3 className={cn('text-white line-clamp-1', tabData.title.length > 24 && 'bg-gradient-to-r from-white via-white to-gray/0 bg-clip-text text-transparent')}>{tabData.title.slice(0, 28)}</H3>}
            {tabData.url && <SPAN>{getDomain(tabData.url)}</SPAN>}
          </div>
        </div>
      </div>

      <Button className={cn('px-[11px]', 'grid place-items-center group')} title="Add to favorites">
        <Star className={cn(ITEMS_STYLE.icon, 'size-[22px]')} />
      </Button>
    </header>
  )
}
