import {cn} from '@/lib/utils'

type Props = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  to?: string
  className?: string
  onClick?: () => void
}

const BUTTON_STYLES = {
  DEFAULT: 'w-fit flex px-4 py-2 rounded-lg duration-300',
  primary: 'bg-gray',
  secondary: 'bg-control text-white hover:bg-control/70',
}

export default function Button({children, variant = 'secondary', to, className, onClick}: Props) {
  const buttonStyles = cn(BUTTON_STYLES.DEFAULT, BUTTON_STYLES[variant])

  if (to) {
    return (
      <a href={to} target="_blank" className={cn(buttonStyles, className)} onClick={onClick}>
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
