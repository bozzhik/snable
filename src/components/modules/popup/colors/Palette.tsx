import type {ColorsResponse} from '_modules/popup/details/Colors'
import type {ColorData} from '_scripts/colorsExtractor'
import {Copy, Check} from 'lucide-react'

import {useCopy} from '_hooks/useCopy'
import {cn} from '@/lib/utils'

import ColorCell from '~/UI/ColorCell'
import {H3} from '~/UI/Typography'

export default function Palette({data}: {data: ColorsResponse | undefined}) {
  return (
    <section data-section="palette-colors" className="space-y-2">
      {data?.colors.map(({color, isContrasted}) => <PaletteItem color={color} isContrasted={isContrasted} key={color} />)}
    </section>
  )
}

function PaletteItem({color, isContrasted}: ColorData) {
  const {tooltip, copyToClipboard} = useCopy(700)

  const contrastedStyles = isContrasted ? 'text-background' : 'text-white'
  const iconStyles = 'size-5 opacity-0 group-hover:opacity-100 duration-200'

  return (
    <ColorCell className={cn('h-auto group', 'py-3.5 flex justify-between px-4', !isContrasted && 'ring ring-gray/20')} color={color} isContrasted={isContrasted} onClick={() => copyToClipboard(color)}>
      <H3 className={contrastedStyles}>{tooltip || color}</H3>

      {!tooltip ? <Copy className={cn(iconStyles, contrastedStyles)} strokeWidth={1.7} /> : <Check className={cn(iconStyles, contrastedStyles)} strokeWidth={1.7} />}
    </ColorCell>
  )
}
