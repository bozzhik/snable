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
      unit: '#191919',
      control: '#1F1F1F',
      white: '#FFFFFF',
      gray: '#818181',
      transparent: 'transparent',
    },
  },
  plugins: [],
} satisfies Config
