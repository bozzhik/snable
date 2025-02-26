import {unitStyles} from '~/UI/Unit'

import {useEffect, useState} from 'react'
import {favoritesManager, type Favorite} from '@/lib/favoritesManager'
import {cn} from '@/lib/utils'

import Layout from '~/Global/Layout'
import TabData from '~/Global/Header/TabData'
import {ExpandButton} from '~/UI/Button'
import {ControlsBack} from '~~popup/colors/Controls'

export function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    setFavorites(favoritesManager.getFavorites())

    const handleStorageChange = () => {
      setFavorites(favoritesManager.getFavorites())
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <Layout className="space-y-2.5">
      <ControlsBack />

      {favorites.length > 0 ? (
        favorites.map((tab) => (
          <div className={cn(unitStyles, 'flex justify-between')} key={tab.url}>
            <TabData view="favorites" tab={tab} />

            <ExpandButton href={tab.url} className="py-1" />
          </div>
        ))
      ) : (
        <p>No favorites saved.</p>
      )}
    </Layout>
  )
}
