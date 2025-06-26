import {unitStyles} from '~/UI/Unit'

import {useEffect, useState} from 'react'
import {favoritesController, type Favorite} from '@/lib/favorites-controller'
import {cn} from '@/lib/utils'

import Layout from '~/Global/Layout'
import TabData from '~/Global/Header/TabData'
import {ExpandButton} from '~/UI/Button'
import {ControlsBack} from '~/UI/Controls'
import NotFound from '~/UI/NotFound'

export function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    setFavorites(favoritesController.getFavorites())

    const handleStorageChange = () => {
      setFavorites(favoritesController.getFavorites())
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleRemoveFavorite = (url: string) => {
    favoritesController.removeFavorite(url)
    setFavorites(favoritesController.getFavorites())
  }

  return (
    <Layout className="space-y-2.5">
      <ControlsBack />

      {favoritesController.hasFavorites() ? (
        favorites.map((tab) => (
          <div className={cn(unitStyles, 'flex justify-between')} key={tab.url}>
            <TabData view="favorites" tab={tab} onRemove={() => handleRemoveFavorite(tab.url)} />

            <ExpandButton href={tab.url} className="py-1" />
          </div>
        ))
      ) : (
        <NotFound>No favorites saved</NotFound>
      )}
    </Layout>
  )
}
