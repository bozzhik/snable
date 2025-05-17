import type {TabInfo} from '@/background/getTabData'
import {MODULE_STYLE} from '@/lib/constants'

import {sendTabData} from '@/lib/backend'
import {getDomain} from '@/utils/getDomain'
import {cn} from '@/lib/utils'

import {useEffect} from 'react'

import {H3, SPAN} from '~/UI/Typography'
import {Ban, X} from 'lucide-react'

export default function TabData({tab, view, className, onRemove}: {tab: TabInfo; view: 'header' | 'favorites'; className?: string; onRemove?: () => void}) {
  const {favicon, title, url} = tab

  const headerTab = view === 'header'

  useEffect(() => {
    if (headerTab && url) {
      const sessions = JSON.parse(localStorage.getItem('sessions') || '[]')
      const wasDataSent = sessions.includes(url)

      if (!wasDataSent) {
        setTimeout(() => {
          sendTabData(tab)
          const updatedSessions = [...sessions, url]
          localStorage.setItem('sessions', JSON.stringify(updatedSessions))
        }, 1000)
      }
    }
  }, [tab, headerTab])

  return (
    <div className={cn('flex items-center', headerTab ? 'gap-3' : 'gap-2.5', className)}>
      <div className={cn(MODULE_STYLE.box, 'relative bg-transparent overflow-hidden', !headerTab && 'size-[48px] group')}>
        {favicon ? (
          <img src={favicon} className={cn('size-full', 'group-hover:opacity-15 duration-300')} alt="website favicon" />
        ) : (
          <div className={cn(MODULE_STYLE.box, 'bg-control p-2 group', 'group-hover:opacity-10 duration-300')}>
            <Ban className={cn(MODULE_STYLE.icon, 'size-6')} />
          </div>
        )}

        {!headerTab && (
          <div className={cn(MODULE_STYLE.box, 'absolute size-full bg-transparent opacity-0', 'group-hover:opacity-100 duration-300')} onClick={!headerTab && onRemove}>
            <X className={cn(MODULE_STYLE.icon, 'size-8')} strokeWidth={1.7} />
          </div>
        )}
      </div>

      <div className="-space-y-1 mt-0.5">
        {title && <H3 className={cn('text-white line-clamp-1', title.length > (headerTab ? 24 : 34) && 'bg-gradient-to-r from-white via-white to-gray/0 bg-clip-text text-transparent')}>{headerTab ? title.slice(0, 24) : title}</H3>}
        {url && <SPAN>{getDomain(url)}</SPAN>}
      </div>
    </div>
  )
}
