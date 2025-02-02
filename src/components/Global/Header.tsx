import {BOX_STYLES} from '~/Global/Container'
import {cn} from '@/lib/utils'

import Button from '~/UI/Button'

export default function Header() {
  return (
    <div className={cn(BOX_STYLES, 'py-3 flex justify-between border-b-3 border-control')}>
      <div className={cn('size-10 bg-control rounded-lg p-2', 'group')}>
        <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.1] group-hover:bg-white/80 duration-300')}></div>
      </div>

      <Button variant="secondary">Button</Button>
    </div>
  )
}
