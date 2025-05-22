import type {FontData} from '_scripts/fontsExtractor'
import {FONT_WEIGHTS} from '@/lib/constants'

import {cn} from '@/lib/utils'

import Unit, {unitStyles} from '~/UI/Unit'
import {H2, H3} from '~/UI/Typography'
import NotFound from '~/UI/NotFound'

export default function FontsUnit({data}: {data: FontData[] | undefined}) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Unit token="fonts">
        <NotFound>No fonts detected</NotFound>
      </Unit>
    )
  }

  return (
    <Unit token="fonts" className={cn('p-0 bg-transparent', 'space-y-2')}>
      {Object.values(data)
        .slice(0, 4)
        .map(({font, weights}) => (
          <div key={font} className={cn(unitStyles, 'px-2.5 py-1.5')}>
            <H2 className="first-letter:uppercase">{font}</H2>

            <div className="flex gap-1.5">
              {weights.map((weight) => (
                <H3 key={weight}>{FONT_WEIGHTS[weight] || weight}</H3>
              ))}
            </div>
          </div>
        ))}
    </Unit>
  )
}
