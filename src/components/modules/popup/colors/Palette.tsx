import type {ColorsResponse} from '_modules/popup/details/Colors'
import {cn} from '@/lib/utils'

import {H4} from '~/UI/Typography'

export default function Palette({data}: {data: ColorsResponse | undefined}) {
  return (
    <section data-section="palette-colors" className="space-y-2">
      {data?.colors.map(({color, isContrasted}) => (
        <div className={cn('grid place-items-center w-full h-12 rounded-lg', !isContrasted && 'ring ring-gray/20')} style={{backgroundColor: color}} key={color}>
          <H4 className={cn('', isContrasted ? 'text-background' : 'text-white')}>{color}</H4>
        </div>
      ))}
    </section>
  )
}
