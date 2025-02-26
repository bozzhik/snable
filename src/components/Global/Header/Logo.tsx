import {MODULE_STYLE} from '@/lib/constants'
import {cn} from '@/lib/utils'

export default function Logo() {
  return (
    <div className={cn(MODULE_STYLE.box, 'p-2 group')}>
      <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300')}></div>
    </div>
  )
}
