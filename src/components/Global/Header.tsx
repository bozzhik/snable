import {cn} from '@/lib/utils'

export default function Header() {
  return (
    <div className="flex justify-between px-3.5 py-3 border-b-2 border-control">
      <div className={cn('size-10 bg-control rounded-lg p-2', 'group')}>
        <div className={cn('size-full bg-white rounded-full', 'group-hover:scale-[1.05] group-hover:bg-white/80 duration-300')}></div>
      </div>

      <button className="px-4 bg-control hover:bg-control/70 duration-300 rounded-lg">Button</button>
    </div>
  )
}
