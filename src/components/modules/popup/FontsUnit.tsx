import type {FontData} from '_scripts/fontsExtractor'
import {FONT_WEIGHTS} from '@/lib/constants'

import Unit from '~/UI/Unit'

export default function FontsUnit({data}: {data: FontData[] | undefined}) {
  if (!data || Object.keys(data).length === 0) {
    return <Unit token="fonts">No fonts detected</Unit>
  }

  return (
    <Unit token="fonts" className="px-2.5 py-1.5">
      <div className="space-y-2">
        {Object.values(data).map(({font, weights}) => (
          <div key={font} className="">
            <div className="font-semibold text-3xl">{font}</div>

            <div className="flex gap-2 text-lg text-gray leading-[1.3]">
              {weights.map((weight) => (
                <span key={weight}>{FONT_WEIGHTS[weight] || weight}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Unit>
  )
}
