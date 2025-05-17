import type {ImageData} from '_scripts/imagesExtractor'
import {ROUTES} from '@/lib/routes'

import Unit from '~/UI/Unit'
import ImageCell from '~/UI/ImageCell'
import {ExpandButton} from '~/UI/Button'
import NotFound from '~/UI/NotFound'

export default function ImagesUnit({data}: {data: ImageData[] | undefined}) {
  if (!data || data.length === 0) {
    return (
      <Unit token="images">
        <NotFound>No images detected</NotFound>
      </Unit>
    )
  }

  const imgItems = data.filter(({type}) => type === 'img')
  const otherItems = data.filter(({type}) => type !== 'img')
  const imagesData = [...imgItems]

  if (imgItems.length < 4) {
    imagesData.push(...otherItems.slice(0, 4 - imgItems.length))
  }

  return (
    <Unit token="images" className="flex gap-2">
      {imagesData.slice(0, 4).map(({src, type}) => (
        <ImageCell view="details" source={src} type={type} key={src} />
      ))}

      <ExpandButton to={ROUTES.images} />
    </Unit>
  )
}
