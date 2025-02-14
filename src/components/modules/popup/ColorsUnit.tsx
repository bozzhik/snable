import type {ColorData} from '_scripts/colorsExtractor'

import {useState} from 'react'
import {cn} from '@/lib/utils'

import Unit from '~/UI/Unit'
import {SPAN} from '~/UI/Typography'

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
          <div className={cn('relative group', 'grid place-items-center w-full h-14 rounded-lg', !isContrasted && 'ring ring-gray/35')} style={{backgroundColor: color}} onClick={() => handleCopy(color)} onMouseEnter={() => setTooltip(color)} onMouseLeave={() => setTooltip('')} key={color}>
            <SPAN className={cn('absolute -top-[35px] left-1/2 transform -translate-x-1/2', 'px-1.5 py-1 text-background bg-white rounded-md', 'opacity-0 group-hover:opacity-100 transition-opacity')}>{tooltip || color}</SPAN>
          </div>
        ))}
      </div>
    </Unit>
  )
}
