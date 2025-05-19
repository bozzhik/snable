import type {TabInfo} from '@/background/getTabData'
import type {UserData} from '@/lib/user-controller'

import {WEBSITE_PATH} from '@/lib/constants'

import {developerController} from '@/lib/developer-controller'

export async function sendTabData(tabInfo: TabInfo) {
  try {
    if (developerController.getControl('DISABLE_SEND')) {
      console.log('DATA SENDING - DISABLED')
      return
    }

    const res = await fetch(`${WEBSITE_PATH}/api/session`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(tabInfo),
    })
    if (!res.ok) throw Error('Failed to send tab data')
  } catch (error) {
    console.error('Error sending tab data:', error)
  }
}

export async function syncUserData(userData: UserData) {
  try {
    // if (developerController.getControl('DISABLE_SEND')) {
    //   console.log('USER DATA SENDING - DISABLED')
    //   return
    // }

    const res = await fetch(`${WEBSITE_PATH}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Token': userData.token,
      },
      body: JSON.stringify(userData),
    })
    if (!res.ok) throw Error('Failed to sync user data')
  } catch (error) {
    console.error('Error syncing user data:', error)
  }
}
