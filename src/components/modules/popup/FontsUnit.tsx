import type {FontData} from '_scripts/fontsExtractor'
import {FONT_WEIGHTS} from '@/lib/constants'

import Unit, {unitStyles} from '~/UI/Unit'
import {cn} from '@/lib/utils'

export default function FontsUnit({data}: {data: FontData[] | undefined}) {
  if (!data || Object.keys(data).length === 0) {
    return <Unit token="fonts">No fonts detected</Unit>
  }

  return (
    <Unit token="fonts" className={cn('p-0 bg-transparent', 'space-y-2')}>
      {Object.values(data)
        .slice(0, 3)
        .map(({font, weights}) => (
          <div key={font} className={cn(unitStyles, 'px-2.5 py-1.5')}>
            <div className="font-semibold text-3xl">{font}</div>

            <div className="flex gap-1.5 text-lg text-gray leading-[1.3]">
              {weights.map((weight) => (
                <span key={weight}>{FONT_WEIGHTS[weight] || weight}</span>
              ))}
            </div>
          </div>
        ))}
    </Unit>
  )
}
