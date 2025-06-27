import type {TabInfo} from '_bg/getTabData'
import {BOX_STYLES} from '~/Global/Container'
import {HEADER_MENU, MODULE_STYLE} from '@/lib/constants'
import {ROUTES} from '@/lib/routes'

import {developerController} from '@/lib/developer-controller'
import {favoritesController} from '@/lib/favorites-controller'
import {cn} from '@/lib/utils'

import {useEffect, useState} from 'react'
import {useHashLocation} from 'wouter/use-hash-location'
import {toast} from 'sonner'

import {Link} from 'wouter'
import TabData from '~/Global/Header/TabData'
import Button, {BUTTON_STYLES} from '~/UI/Button'
import {X, Star, AlignJustify} from 'lucide-react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '~/UI/Dropdown'

export const BLUR_BG = 'bg-[#121212f7] backdrop-blur-sm'

export default function Header() {
  const [tabData, setTabData] = useState<TabInfo>({} as TabInfo)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const [location, navigate] = useHashLocation()
  const isNonDetailsPage = [ROUTES.favorites].includes(location)

  useEffect(() => {
    chrome.runtime.sendMessage({type: 'GET_TAB_INFO'}, (response) => {
      setTabData(response)
      setIsFavorite(favoritesController.isFavorite(response.url))
    })
  }, [])

  async function handleFavoriteClick() {
    if (!tabData.url) return

    const newState = await favoritesController.toggleFavorite({
      url: tabData.url,
      title: tabData.title,
      favicon: tabData.favicon,
    })

    setIsFavorite(newState)

    toast(!isFavorite ? "It's now in your favorites! Check them out." : "It's out! No longer a favorite.", {
      action: {
        label: !isFavorite ? 'View all' : 'View favorites',
        onClick: () => navigate(ROUTES.favorites),
      },
    })
  }

  return (
    <header className={cn(BOX_STYLES, 'fixed z-[99] w-full', 'py-2.5 flex justify-between', BLUR_BG, 'border-b-3 border-control')}>
      <div className="flex items-center gap-[3px]">
        <a href="https://snable.website" target="_blank" className={cn(MODULE_STYLE.box, 'p-2 group')}>
          <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300', developerController.isDebugMode && 'bg-gray')}></div>
        </a>

        <X className={cn('size-4 text-gray', isNonDetailsPage && 'opacity-0')} />
        <TabData view="header" tab={tabData} className={cn(isNonDetailsPage && 'opacity-0')} />
      </div>

      <div className="flex items-center gap-[5px]">
        <Button onClick={handleFavoriteClick} className={cn('px-2.5 py-2.5', 'grid place-items-center group', isNonDetailsPage && 'opacity-0')} title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
          <Star className={cn(MODULE_STYLE.icon, 'size-[22px]', isFavorite && 'text-white')} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={1.7} />
        </Button>

        <DropdownMenu onOpenChange={setIsMenuActive}>
          <DropdownMenuTrigger title="Menu">
            <div className={cn([BUTTON_STYLES.DEFAULT, BUTTON_STYLES.secondary], 'px-2.5 py-2.5', 'grid place-items-center group', isMenuActive && 'bg-control/70')}>
              <AlignJustify className={cn(MODULE_STYLE.icon, 'size-[22px]', isMenuActive && 'text-white scale-[1.05]')} strokeWidth={1.7} />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mt-0.5 mr-2.5">
            {HEADER_MENU.filter((item) => item.label !== 'Favorites' || favoritesController.hasFavorites()).map(({label, to, href}, index) => (
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
