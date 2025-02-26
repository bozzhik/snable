import {useEffect, useState} from 'react'
import {favoritesManager, type Favorite} from '@/lib/favoritesManager' // Adjust the path if needed

import Layout from '~/Global/Layout'

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
      {favorites.length > 0 ? (
        favorites.map(({url, title, favicon}) => (
          <div key={url} className="flex items-center gap-2 p-1 rounded bg-unit">
            {favicon && <img src={favicon} alt={title} className="size-10" />}
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline">
              {title}
            </a>
          </div>
        ))
      ) : (
        <p>No favorites saved.</p>
      )}
    </Layout>
  )
}
