import {ROUTES} from '@/lib/routes'
import {MODULE_STYLE} from '@/lib/constants'
import {BLUR_BG} from '~/Global/Header'

import {cn} from '@/lib/utils'

import Button from '~/UI/Button'
import {ArrowUpLeft} from 'lucide-react'

export const CONTROLS_GAP = 'mt-14'

export function ControlsBack({className}: {className?: string}) {
  return (
    <Button to={ROUTES.home} className={cn('w-full p-2', 'grid place-items-center group hover:bg-unit', className)}>
      <ArrowUpLeft className={cn(MODULE_STYLE.icon, 'size-7')} strokeWidth={1.25} />
    </Button>
  )
}

export function ControlsTabItem({item, isSelected, onClick}: {item: string; isSelected: boolean; onClick: () => void}) {
  return (
    <button className={cn('w-full py-1 rounded-md text-gray uppercase duration-200 cursor-pointer', isSelected && 'bg-control text-white')} onClick={onClick}>
      {item}
    </button>
  )
}

export default function Controls({children}: {children: React.ReactNode}) {
  return (
    <section data-section="controls" className={cn('fixed z-[90] inset-0 w-full h-fit', 'top-16 pt-4 pb-2.5 ', BLUR_BG)}>
      <div className="flex justify-between gap-3 mx-3">
        <ControlsBack className="w-fit" />

        <div className="flex gap-1.5 bg-unit w-full p-1.5 rounded-lg">{children}</div>
      </div>
    </section>
  )
}
