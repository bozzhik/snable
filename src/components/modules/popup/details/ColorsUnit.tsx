import type {ColorData} from '_scripts/colorsExtractor'
import {ROUTES} from '@/lib/routes'

import {cn} from '@/lib/utils'
import {useCopy} from '_hooks/useCopy'

import Unit from '~/UI/Unit'
import {SPAN} from '~/UI/Typography'
import ColorCell from '~/UI/ColorCell'
import {ExpandButton} from '~/UI/Button'

export default function ColorsUnit({data}: {data: ColorData[] | undefined}) {
  const {tooltip, copyToClipboard, setTooltip} = useCopy(1500)

  if (!data || data.length === 0) {
    return <Unit token="colors">No colors detected</Unit>
  }

  return (
    <Unit token="colors" className="flex gap-2">
      {data.slice(0, 5).map(({color, isContrasted}) => (
        <ColorCell className="relative group" color={color} isContrasted={isContrasted} onClick={() => copyToClipboard(color)} onMouseEnter={() => setTooltip(color)} onMouseLeave={() => setTooltip('')} key={color}>
          <SPAN className={cn('absolute -top-[35px] left-1/2 transform -translate-x-1/2', 'px-1.5 py-1 text-background bg-white rounded-md', 'opacity-0 group-hover:opacity-100 transition-opacity')}>{tooltip || color}</SPAN>
        </ColorCell>
      ))}

      <ExpandButton to={ROUTES.colors} />
    </Unit>
  )
}
