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

    const favorites = [...this.getFavorites(), data]
    localStorage.setItem('favorites', JSON.stringify(favorites))

    userController.updateFavorites()
    await userController.sync()
  },

  async removeFavorite(url: string): Promise<void> {
    const favorites = this.getFavorites().filter((fav) => fav.url !== url)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    userController.updateFavorites()
    await userController.sync()
  },

  async toggleFavorite(data: Favorite): Promise<boolean> {
    if (this.isFavorite(data.url)) {
      await this.removeFavorite(data.url)
      return false
    }

    await this.addFavorite(data)
    return true
  },
}
