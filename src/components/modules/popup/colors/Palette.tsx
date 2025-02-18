import type {ColorsResponse} from '_modules/popup/details/Colors'
import {cn} from '@/lib/utils'

import ColorCell from '~/UI/ColorCell'
import {H4} from '~/UI/Typography'

export default function Palette({data}: {data: ColorsResponse | undefined}) {
  return (
    <section data-section="palette-colors" className="space-y-2">
      {data?.colors.map(({color, isContrasted}) => (
        <ColorCell color={color} isContrasted={isContrasted} className={cn('h-12', !isContrasted && 'ring ring-gray/20')} key={color}>
          <H4 className={cn('', isContrasted ? 'text-background' : 'text-white')}>{color}</H4>
        </ColorCell>
      ))}
    </section>
  )
}
