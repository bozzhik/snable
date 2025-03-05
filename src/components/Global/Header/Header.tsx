import {type TabInfo} from '_bg/getTabData'
import {BOX_STYLES} from '~/Global/Container'
import {HEADER_MENU, MODULE_STYLE} from '@/lib/constants'
import {ROUTES} from '@/lib/routes'

import {useEffect, useState} from 'react'
import {cn} from '@/lib/utils'
import {favoritesManager} from '@/lib/favoritesManager'
import {toast} from 'sonner'

import {useRoute, Link} from 'wouter'
import TabData from '~/Global/Header/TabData'
import Button, {BUTTON_STYLES} from '~/UI/Button'
import {X, Star, AlignJustify} from 'lucide-react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '~/UI/Dropdown'

export default function Header() {
  const [tabData, setTabData] = useState<TabInfo>({} as TabInfo)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const [matchFavorites] = useRoute(ROUTES.favorites)

  useEffect(() => {
    chrome.runtime.sendMessage({type: 'GET_TAB_INFO'}, (response) => {
      setTabData(response)
      setIsFavorite(favoritesManager.isFavorite(response.url))
    })
  }, [])

  function handleFavoriteClick() {
    if (!tabData.url) return

    setIsFavorite(
      favoritesManager.toggleFavorite({
        url: tabData.url,
        title: tabData.title,
        favicon: tabData.favicon,
      }),
    )

    toast(`${!isFavorite ? 'Added to favorites' : 'Removed from favorites'}`)
  }

  return (
    <header className={cn(BOX_STYLES, 'fixed z-[99] w-full', 'py-2.5 flex justify-between bg-[#121212f7] backdrop-blur-sm border-b-3 border-control')}>
      <div className="flex items-center gap-[3px]">
        <a href="https://snable.website" target="_blank" className={cn(MODULE_STYLE.box, 'p-2 group')}>
          <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300')}></div>
        </a>

        <X className={cn('size-4 text-gray', matchFavorites && 'opacity-0')} />
        <TabData view="header" tab={tabData} className={cn(matchFavorites && 'opacity-0')} />
      </div>

      <div className="flex items-center gap-[5px]">
        <Button onClick={handleFavoriteClick} className={cn('px-2.5 py-2.5', 'grid place-items-center group', matchFavorites && 'opacity-0')} title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
          <Star className={cn(MODULE_STYLE.icon, 'size-[22px]', isFavorite && 'text-white')} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={1.7} />
        </Button>

        <DropdownMenu onOpenChange={setIsMenuActive}>
          <DropdownMenuTrigger title="Menu">
            <div className={cn([BUTTON_STYLES.DEFAULT, BUTTON_STYLES.secondary], 'px-2.5 py-2.5', 'grid place-items-center group', isMenuActive && 'bg-control/70')}>
              <AlignJustify className={cn(MODULE_STYLE.icon, 'size-[22px]', isMenuActive && 'text-white scale-[1.05]')} strokeWidth={1.7} />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mt-0.5 mr-2.5">
            {HEADER_MENU.filter((item) => item.label !== 'Favorites' || favoritesManager.hasFavorites()).map(({label, to, href}, index) => (
              <DropdownMenuItem key={index} className="cursor-pointer" asChild>
                {to ? (
                  <Link href={to}>{label}</Link>
                ) : (
                  <a href={href} target="_blank">
                    {label}
                  </a>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
