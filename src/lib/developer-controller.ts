const ControlKey = {
  DEBUG: 'DEBUG_MODE',
  DISABLE_SEND: 'DISABLE_DATA_SEND',
  PLUGIN_ONBOARDING: 'FIGMA_PLUGIN_ONBOARDING',
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

  setControl(key: keyof Controls, value: boolean): void {
    localStorage.setItem(ControlKey[key], JSON.stringify(value))
  },

  get isDebugMode(): boolean {
    return this.getControl('DEBUG')
  },

  // developerController.getControl('DISABLE_SEND')

  get isPluginEnabled(): boolean {
    return this.getControl('PLUGIN_ONBOARDING')
  },

  enablePlugin(): boolean {
    this.setControl('PLUGIN_ONBOARDING', true)
    return true
  },
}
