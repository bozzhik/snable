import {cn} from '@/lib/utils'
import {Link} from 'wouter'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  to?: string // routing
  href?: string // external links
  className?: string
  onClick?: () => void
}

const BUTTON_STYLES = {
  DEFAULT: 'w-fit flex px-4 py-2 rounded-lg duration-300',
  primary: 'bg-gray',
  secondary: 'bg-control text-white hover:bg-control/70',
}

export default function Button({children, variant = 'secondary', to, href, className, onClick}: Props) {
  const buttonStyles = cn(BUTTON_STYLES.DEFAULT, BUTTON_STYLES[variant])

  if (to) {
    return (
      <Link href={to} className={cn(buttonStyles, className)} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" className={cn(buttonStyles, className)} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button className={cn(buttonStyles, className)} onClick={onClick}>
      {children}
    </button>
  )
}
