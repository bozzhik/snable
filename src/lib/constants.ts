import {ROUTES} from '@/lib/routes'

export const IS_DEV = process.env.NODE_ENV == 'development'
export const WEBSITE_PATH = IS_DEV ? 'http://localhost:3000' : 'https://snable.website'

export const HEADER_MENU = [
  {
    label: 'Favorites',
    to: ROUTES.favorites,
  },
  {
    label: 'About',
    href: 'https://snable.website',
  },
  {
    label: 'Rate us',
    href: 'https://snable.website/reviews',
  },
]

export const FONT_WEIGHTS: Record<string, string> = {
  '100': 'thin',
  '200': 'ultralight',
  '300': 'light',
  '400': 'regular',
  '500': 'medium',
  '600': 'semibold',
  '700': 'bold',
  '800': 'extrabold',
  '900': 'black',
}

export const MODULE_STYLE = {
  box: 'size-[42px] bg-control rounded-lg grid place-items-center',
  icon: 'text-gray group-hover:text-white group-hover:scale-[1.05] duration-300',
}
