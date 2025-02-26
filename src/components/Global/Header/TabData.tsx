import type {TabInfo} from '@/background/getTabData'
import {MODULE_STYLE} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {getDomain} from '@/utils/getDomain'

import {H3, SPAN} from '~/UI/Typography'
import {Ban} from 'lucide-react'

export default function TabData({tab, view}: {tab: TabInfo; view: 'header' | 'favorites'}) {
  const {favicon, title, url} = tab

  const headerTab = view === 'header'

  return (
    <div className={cn('flex items-center', headerTab ? 'gap-3' : 'gap-2.5')}>
      <div className={cn(MODULE_STYLE.box, 'bg-transparent overflow-hidden', !headerTab && 'size-[48px]')}>
        {favicon ? (
          <img src={favicon} className="size-full" alt="website favicon" />
        ) : (
          <div className={cn(MODULE_STYLE.box, 'bg-control p-2 group')}>
            <Ban className={cn(MODULE_STYLE.icon, 'size-6')} />
          </div>
        )}
      </div>

      <div className="-space-y-0.5 mt-0.5">
        {title && <H3 className={cn('text-white line-clamp-1', title.length > (headerTab ? 24 : 34) && 'bg-gradient-to-r from-white via-white to-gray/0 bg-clip-text text-transparent')}>{title.slice(0, 28)}</H3>}
        {url && <SPAN>{getDomain(url)}</SPAN>}
      </div>
    </div>
  )
}
