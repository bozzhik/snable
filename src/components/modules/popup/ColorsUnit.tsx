import {cn} from '@/lib/utils'
import type {ColorData} from '_scripts/colorsExtractor'

import {useState, useEffect} from 'react'
import Unit from '~/UI/Unit'

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
    <Unit token="colors" className="">
      <div className="flex gap-1.5">
        {data.slice(0, 5).map(({color}) => (
          <div className={cn('relative group', 'grid place-items-center w-full h-14 rounded-lg')} style={{backgroundColor: color}} onClick={() => handleCopy(color)} onMouseEnter={() => setTooltip(color)} onMouseLeave={() => setTooltip('')} key={color}>
            <span className={cn('absolute -top-[35px] left-1/2 transform -translate-x-1/2', 'px-1.5 py-1 text-sm text-background bg-white rounded-md', 'opacity-0 group-hover:opacity-100 transition-opacity')}>{tooltip || color}</span>
          </div>
        ))}
      </div>
    </Unit>
  )
}
