import type {ColorData} from '_scripts/colorsExtractor'
import {ITEMS_STYLE} from '~/Global/Header'
import {ROUTES} from '@/lib/routes'

import {useState} from 'react'
import {cn} from '@/lib/utils'
import {ArrowUpRight} from 'lucide-react'

import Unit from '~/UI/Unit'
import {SPAN} from '~/UI/Typography'
import ColorCell from '~/UI/ColorCell'
import Button from '~/UI/Button'

export default function ColorsUnit({data}: {data: ColorData[] | undefined}) {
  const [tooltip, setTooltip] = useState('')

  if (!data || data.length === 0) {
    return <Unit token="colors">No colors detected</Unit>
  }

  const handleCopy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setTooltip('Copied!')
      setTimeout(() => setTooltip(''), 1500)
    } catch (err) {
      setTooltip('Failed to copy!')
    }
  }

  return (
    <Unit token="colors">
      <div className="flex gap-2">
        {data.slice(0, 5).map(({color, isContrasted}) => (
          <ColorCell className="relative group" color={color} isContrasted={isContrasted} onClick={() => handleCopy(color)} onMouseEnter={() => setTooltip(color)} onMouseLeave={() => setTooltip('')} key={color}>
            <SPAN className={cn('absolute -top-[35px] left-1/2 transform -translate-x-1/2', 'px-1.5 py-1 text-background bg-white rounded-md', 'opacity-0 group-hover:opacity-100 transition-opacity')}>{tooltip || color}</SPAN>
          </ColorCell>
        ))}

        <Button to={ROUTES.colors} className={cn('px-1', 'grid place-items-center group hover:bg-unit')}>
          <ArrowUpRight className={cn(ITEMS_STYLE.icon, 'size-10')} strokeWidth={1.25} />
        </Button>
      </div>
    </Unit>
  )
}
