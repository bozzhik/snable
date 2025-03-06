import {ArrowUpRight} from 'lucide-react'
import {MODULE_STYLE} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {Link} from 'wouter'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  to?: string // routing
  href?: string // external links
  title?: string
  className?: string
  onClick?: () => void
}

export const BUTTON_STYLES = {
  DEFAULT: 'w-fit flex px-4 py-2 rounded-lg duration-300',
  primary: 'bg-gray',
  secondary: 'bg-control text-white hover:bg-control/70',
}

export default function Button({children, variant = 'secondary', to, href, title, className, onClick}: Props) {
  const buttonStyles = cn(BUTTON_STYLES.DEFAULT, BUTTON_STYLES[variant])

  if (to) {
    return (
      <Link href={to} className={cn(buttonStyles, className)} onClick={onClick} data-link="wouter-link">
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" className={cn(buttonStyles, className)} onClick={onClick} data-link="html-link">
        {children}
      </a>
    )
  }

  return (
    <button className={cn(buttonStyles, className)} title={title} onClick={onClick}>
      {children}
    </button>
  )
}

export function ExpandButton({to, href, className}: {to?: string; href?: string; className?: string}) {
  return (
    <Button to={to} href={href} className={cn('px-1', 'grid place-items-center group hover:bg-unit', className)}>
      <ArrowUpRight className={cn(MODULE_STYLE.icon, 'size-10')} strokeWidth={1.25} />
    </Button>
  )
}
