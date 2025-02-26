import type {TabInfo} from '@/background/getTabData'
import {MODULE_STYLE} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {getDomain} from '@/utils/getDomain'

import {H3, SPAN} from '~/UI/Typography'
import {Ban} from 'lucide-react'

export default function TabData({tab}: {tab: TabInfo}) {
  const {favicon, title, url} = tab

  return (
    <div className="flex items-center gap-3">
      <div className={cn(MODULE_STYLE.box, 'bg-transparent overflow-hidden')}>
        {favicon ? (
          <img src={favicon} className="size-full" alt="website favicon" />
        ) : (
          <div className={cn(MODULE_STYLE.box, 'bg-control p-2 group')}>
            <Ban className={cn(MODULE_STYLE.icon, 'size-6')} />
          </div>
        )}
      </div>

      <div className="-space-y-0.5">
        {title && <H3 className={cn('text-white line-clamp-1', title.length > 24 && 'bg-gradient-to-r from-white via-white to-gray/0 bg-clip-text text-transparent')}>{title.slice(0, 28)}</H3>}
        {url && <SPAN>{getDomain(url)}</SPAN>}
      </div>
    </div>
  )
}
