import type {ImageData} from '_scripts/imagesExtractor'
import {cn} from '@/lib/utils'

import Unit from '~/UI/Unit'

export default function ImagesUnit({data}: {data: ImageData[] | undefined}) {
  if (!data || data.length === 0) {
    return <Unit token="images">No images detected</Unit>
  }

  return (
    <Unit token="images" className={cn('flex gap-2')}>
      {data
        .filter(({type}) => type === 'img')
        .slice(0, 4)
        .map(({src}) => (
          <a href={src} className={cn('w-full h-20 rounded-lg', 'grid place-items-center overflow-hidden group')} target="_blank" key={src}>
            <img src={src} className="object-cover size-full bg-control group-hover:scale-[1.05] duration-300" />
          </a>
        ))}
    </Unit>
  )
}
