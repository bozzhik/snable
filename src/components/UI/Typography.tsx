import {cn} from '@/lib/utils'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
}

export type TypoTypes = keyof typeof typoClasses

export const typoClasses = {
  h1: cn('text-3xl leading-[1.1] font-semibold', 'text-white'),
  h2: cn('text-[28px] leading-[1.08] font-semibold', 'text-white'),
  h3: cn('text-lg text-gray leading-[1.3]', 'text-gray'),
  h4: cn('text-base', 'text-gray'),
  span: cn('text-sm', 'text-gray'),
} as const

function Typography({type, className, children}: Props) {
  const Element = type
  return <Element className={cn(typoClasses[type], className)}>{children}</Element>
}

function createTypography(type: TypoTypes) {
  const Component = ({className, children}: Omit<Props, 'type'>) => (
    <Typography type={type} className={className}>
      {children}
    </Typography>
  )
  Component.displayName = `Typography(${type.toUpperCase()})`
  return Component
}

export const H1 = createTypography('h1')
export const H2 = createTypography('h2')
export const H3 = createTypography('h3')
export const H4 = createTypography('h4')
export const SPAN = createTypography('span')
