import {IS_DEV} from '@/lib/constants'

import {generateToken} from '@/utils/generateToken'
import {syncUserData} from '@/lib/backend'

export type UserData = {
  token: string
  snabled: string[]
  favorites: string[]
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
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
    } else {
      console.log('Existing user found:', existingData)
    }
  },

  getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
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

  async sync(): Promise<void> {
    const data = this.getUserData()
    if (!data) return
    console.log('Syncing user data...')
    await syncUserData(data)
  },
}
