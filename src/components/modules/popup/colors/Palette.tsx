import type {ColorsResponse, ColorMode} from '@/modules/popup/Colors'
import type {ColorData} from '_scripts/colorsExtractor'

import {useCopy} from '_hooks/useCopy'
import {cn} from '@/lib/utils'
import {hexToHsl, hexToRgb} from '@/utils/convertColors'

import ColorCell from '~/UI/ColorCell'
import {H3} from '~/UI/Typography'
import {Copy, Check} from 'lucide-react'

export default function Palette({data, format, className}: {data: ColorsResponse | undefined; format: ColorMode; className?: string}) {
  const getColorMode = (color: string): string => {
    switch (format) {
      case 'hex':
        return color
      case 'rgb':
        return hexToRgb(color)
      case 'hsl':
        return hexToHsl(color)
      default:
        return color
    }
  }

  return (
    <section data-section="palette-colors" className={cn('space-y-2', className)}>
      {data?.colors.map(({color, isContrasted}) => <PaletteItem key={color} color={getColorMode(color)} isContrasted={isContrasted} />)}
    </section>
  )
}

function PaletteItem({color, isContrasted}: ColorData) {
  const {tooltip, copyToClipboard} = useCopy(700)

  const contrastedStyles = isContrasted ? 'text-background' : 'text-white'
  const iconStyles = 'size-5 opacity-0 group-hover:opacity-100 duration-200'

  return (
    <ColorCell className={cn('h-auto group', 'py-3.5 flex justify-between px-4')} color={color} isContrasted={isContrasted} onClick={() => copyToClipboard(color)}>
      <H3 className={cn(contrastedStyles, tooltip && 'uppercase')}>{tooltip || color}</H3>

      {!tooltip ? <Copy className={cn(iconStyles, contrastedStyles)} strokeWidth={1.7} /> : <Check className={cn(iconStyles, contrastedStyles)} strokeWidth={1.7} />}
    </ColorCell>
  )
}
