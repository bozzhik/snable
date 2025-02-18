import {ROUTES} from '@/lib/routes'
import {ITEMS_STYLE} from '~/Global/Header'

import {cn} from '@/lib/utils'

import Button from '~/UI/Button'
import {ArrowUpLeft} from 'lucide-react'

const modes = ['hex', 'rgb', 'hsl'] as const
export type ColorMode = (typeof modes)[number]

type Props = {
  selectedMode: ColorMode
  onModeChange: (mode: ColorMode) => void
}

export default function Controls({selectedMode, onModeChange}: Props) {
  return (
    <section data-section="controls-colors" className="flex justify-between gap-3">
      <Button to={ROUTES.home} className={cn('p-2', 'grid place-items-center group hover:bg-unit')}>
        <ArrowUpLeft className={cn(ITEMS_STYLE.icon, 'size-7')} strokeWidth={1.25} />
      </Button>

      <div className="flex gap-1.5 bg-unit w-full p-1.5 rounded-lg">
        {modes.map((mode) => (
          <button className={cn('w-full py-1 rounded-md text-gray duration-200 cursor-pointer', selectedMode === mode && 'bg-control text-white')} onClick={() => onModeChange(mode)} key={mode}>
            {mode.toUpperCase()}
          </button>
        ))}
      </div>
    </section>
  )
}
