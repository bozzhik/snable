import {IS_DEV} from '@/lib/constants'

import {generateToken} from '@/utils/generateToken'
import {syncUserData} from '@/lib/backend'

export type UserData = {
  token: string
  snabled: string[]
  favorites: string[]
  figma_bridge: {
    count: number
    urls: string[]
  }
}

const STORAGE_KEY = 'user'

export const userController = {
  init(): void {
    const existingData = this.getUserData()
    if (!existingData) {
      const initialData: UserData = {
        token: IS_DEV ? 'DEV' : generateToken(),
        snabled: [],
        favorites: [],
        figma_bridge: {
          count: 0,
          urls: [],
        },
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    } else {
      console.log('Existing user found:', existingData)
    }

    this.updateSnabled()
    this.updateFavorites()
  },

  getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) return null

      const userData = JSON.parse(data)

      if (!userData.figma_bridge) {
        userData.figma_bridge = {
          count: 0,
          urls: [],
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      }

      return userData
    } catch {
      return null
    }
  },

  updateSnabled(): void {
    const data = this.getUserData()
    if (!data) return

    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]')
    data.snabled = sessions
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    console.log('Updated snabled list from sessions:', sessions)
  },

  updateFavorites(): void {
    const data = this.getUserData()
    if (!data) return

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    data.favorites = favorites.map((fav: {url: string}) => fav.url)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    console.log('Updated favorites list:', data.favorites)
  },

  trackFigmaBridge(options: {incrementClick?: boolean; addUrl?: string}): void {
    const data = this.getUserData()
    if (!data) return

    const {incrementClick = false, addUrl} = options

    if (incrementClick) {
      data.figma_bridge.count++
    }

    if (addUrl && !data.figma_bridge.urls.includes(addUrl)) {
      data.figma_bridge.urls.push(addUrl)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    console.log('Figma bridge tracked:', {
      count: data.figma_bridge.count,
      newUrl: addUrl,
      allUrls: data.figma_bridge.urls.length,
    })
  },

  async sync(): Promise<void> {
    const data = this.getUserData()
    if (!data) return
    console.log('Syncing user data...')
    await syncUserData(data)
  },
}
