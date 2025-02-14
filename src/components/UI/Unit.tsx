import {cn} from '@/lib/utils'
import {H4} from '~/UI/Typography'

type Token = 'fonts' | 'colors' | 'images'

type Props = {
  token: Token
  className?: string
  children: React.ReactNode
}

export const unitStyles = 'p-1.5 bg-unit rounded-lg'

export default function Unit({token, className, children}: Props) {
  return (
    <section data-section={`${token}-unit`} className="space-y-1">
      <H4 className="first-letter:uppercase">{token}</H4>

      <div className={cn(unitStyles, className)}>{children}</div>
    </section>
  )
}
