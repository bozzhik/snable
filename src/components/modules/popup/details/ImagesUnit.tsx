import type {ImageData} from '_scripts/imagesExtractor'
import {ROUTES} from '@/lib/routes'
import {cn} from '@/lib/utils'

import Unit from '~/UI/Unit'
import ImageCell from '~/UI/ImageCell'
import {ExpandButton} from '~/UI/Button'

export default function ImagesUnit({data}: {data: ImageData[] | undefined}) {
  if (!data || data.length === 0) {
    return <Unit token="images">No images detected</Unit>
  }

  return (
    <Unit token="images" className={cn('flex gap-[7px]')}>
      {data
        .filter(({type}) => type === 'img')
        .slice(0, 4)
        .map(({src, type}) => (
          <ImageCell source={src} type={type} />
        ))}

      <ExpandButton to={ROUTES.images} />
    </Unit>
  )
}
