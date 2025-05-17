import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    fontFamily: {
      sans: ['SF Pro Display', ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      normal: '400',
    },
    colors: {
      background: '#121212',
      unit: {
        DEFAULT: '#191919',
        dark: '#171717',
      },
      control: '#1F1F1F',
      white: '#FFFFFF',
      gray: {
        DEFAULT: '#818181',
        medium: '#444444',
        dark: '#3D3D3D',
      },
      transparent: 'transparent',
    },
  },
  plugins: [],
} satisfies Config
