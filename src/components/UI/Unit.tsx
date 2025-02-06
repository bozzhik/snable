import {cn} from '@/lib/utils'

type Token = 'fonts' | 'colors' | 'images'

type Props = {
  token: Token
  className?: string
  children: React.ReactNode
}

export default function Unit({token, className, children}: Props) {
  return (
    <section data-section={`${token}-unit`} className="space-y-1">
      <h4 className="text-base text-gray first-letter:uppercase">{token}</h4>

      <div className={cn('p-1.5 bg-unit rounded-lg', className)}>{children}</div>
    </section>
  )
}
