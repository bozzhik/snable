import {type TabInfo} from '_bg/getTabData'

export type Favorite = TabInfo

export const favoritesManager = {
  getFavorites(): Favorite[] {
    try {
      return JSON.parse(localStorage.getItem('favorites') ?? '[]')
    } catch {
      return []
    }
  },

  isFavorite(url: string): boolean {
    return this.getFavorites().some((fav) => fav.url === url)
  },

  addFavorite(data: Favorite): void {
    if (this.isFavorite(data.url)) return

    const favorites = [...this.getFavorites(), data]
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },

  removeFavorite(url: string): void {
    const favorites = this.getFavorites().filter((fav) => fav.url !== url)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },

  toggleFavorite(data: Favorite): boolean {
    if (this.isFavorite(data.url)) {
      this.removeFavorite(data.url)
      return false
    }

    this.addFavorite(data)
    return true
  },
}
