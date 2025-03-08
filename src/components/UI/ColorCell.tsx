import {cn} from '@/lib/utils'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  color: string
  isContrasted: boolean
  className?: string
  children: React.ReactNode
}

export default function ColorCell({color, isContrasted, className, children, ...rest}: Props) {
  return (
    <div {...rest} className={cn('grid place-items-center w-full h-14 rounded-lg', !isContrasted && 'ring ring-gray-dark', className)} style={{backgroundColor: color}}>
      {children}
    </div>
  )
}
