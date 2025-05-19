const ControlKey = {
  DEBUG: 'DEBUG_MODE',
  DISABLE_SEND: 'DISABLE_DATA_SEND',
  EXAMPLE: 'EXAMPLE_FEATURE',
} as const

type Controls = typeof ControlKey

export const developerController = {
  initControls(): void {
    Object.values(ControlKey).forEach((key) => {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(false))
      }
    })
  },

  getControl(key: keyof Controls): boolean {
    try {
      const value = localStorage.getItem(ControlKey[key])
      return value ? JSON.parse(value) : false
    } catch {
      return false
    }
  },

  get isDebugMode(): boolean {
    return this.getControl('DEBUG')
  },
}
