import type {TabInfo} from '_bg/getTabData'
import {userController} from '@/lib/user-controller'

export type Favorite = TabInfo

export const favoritesController = {
  getFavorites(): Favorite[] {
    try {
      return JSON.parse(localStorage.getItem('favorites') ?? '[]')
    } catch {
      return []
    }
  },

  hasFavorites(): boolean {
    return this.getFavorites().length > 0
  },

  isFavorite(url: string): boolean {
    return this.getFavorites().some((fav) => fav.url === url)
  },

  async addFavorite(data: Favorite): Promise<void> {
    if (this.isFavorite(data.url)) return

    // Optimistic UI update
    const favorites = [...this.getFavorites(), data]
    localStorage.setItem('favorites', JSON.stringify(favorites))

    // Asynchronous background update
    userController.updateFavorites()
    userController.sync().catch((error) => {
      console.error('Synchronization error:', error)
      // In case of an error, you can roll back the changes
      const currentFavorites = this.getFavorites().filter((fav) => fav.url !== data.url)
      localStorage.setItem('favorites', JSON.stringify(currentFavorites))
    })
  },

  async removeFavorite(url: string): Promise<void> {
    // Optimistic UI update
    const favorites = this.getFavorites().filter((fav) => fav.url !== url)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    // Asynchronous background update
    userController.updateFavorites()
    userController.sync().catch((error) => {
      console.error('Synchronization error:', error)
      // In case of an error, you can roll back the changes
      const previousFavorites = this.getFavorites()
      localStorage.setItem('favorites', JSON.stringify(previousFavorites))
    })
  },

  async toggleFavorite(data: Favorite): Promise<boolean> {
    const isFavorite = this.isFavorite(data.url)

    if (isFavorite) {
      await this.removeFavorite(data.url)
      return false
    }

    await this.addFavorite(data)
    return true
  },
}
