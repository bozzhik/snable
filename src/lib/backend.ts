import type {TabInfo} from '@/background/getTabData'

import {WEBSITE_PATH} from '@/lib/constants'

export async function sendTabData(tabInfo: TabInfo) {
  try {
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
