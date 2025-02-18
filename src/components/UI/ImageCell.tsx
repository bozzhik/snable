import {cn} from '@/lib/utils'

type Props = {
  source: string
  type: string
  className?: string
}

export default function ImageCell({source, type, className}: Props) {
  return (
    <a href={source} className={cn('w-full h-20 rounded-lg bg-control/70', 'grid place-items-center overflow-hidden group', className)} target="_blank">
      <img src={source} className="object-cover size-full group-hover:scale-[1.05] duration-300" alt={type} />
    </a>
  )
}
