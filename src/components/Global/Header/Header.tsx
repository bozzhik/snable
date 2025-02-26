import {type TabInfo} from '_bg/getTabData'
import {BOX_STYLES} from '~/Global/Container'

import {useEffect, useState} from 'react'
import {cn} from '@/lib/utils'
import {favoritesManager} from '@/lib/favoritesManager'
import {MODULE_STYLE} from '@/lib/constants'

import Logo from '~/Global/Header/Logo'
import TabData from '~/Global/Header/TabInfo'
import {X, Star} from 'lucide-react'
import Button from '~/UI/Button'

export default function Header() {
  const [tabData, setTabData] = useState<TabInfo>({} as TabInfo)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    chrome.runtime.sendMessage({type: 'GET_TAB_INFO'}, (response) => {
      setTabData(response)
      setIsFavorite(favoritesManager.isFavorite(response.url))
    })
  }, [])

  const handleFavoriteClick = () =>
    tabData.url &&
    setIsFavorite(
      favoritesManager.toggleFavorite({
        url: tabData.url,
        title: tabData.title,
        favicon: tabData.favicon,
      }),
    )

  return (
    <header className={cn(BOX_STYLES, 'fixed z-[99] w-full', 'py-3 flex justify-between bg-[#121212f7] backdrop-blur-sm border-b-3 border-control')}>
      <div className="flex items-center gap-1">
        <Logo />
        <X className="size-4 text-gray" />
        <TabData tab={tabData} />
      </div>

      <Button onClick={handleFavoriteClick} className={cn('px-[11px]', 'grid place-items-center group')} title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
        <Star className={cn(MODULE_STYLE.icon, 'size-[22px]', isFavorite && 'text-white')} fill={isFavorite ? 'currentColor' : 'none'} />
      </Button>
    </header>
  )
}
