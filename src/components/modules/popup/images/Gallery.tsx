import type {ImagesResponse, ImageMode} from '@/modules/popup/Images'

import {cn} from '@/lib/utils'

import ImageCell from '~/UI/ImageCell'

export default function Gallery({data, format, className}: {data: ImagesResponse | undefined; format: ImageMode; className?: string}) {
  const filteredImages = data?.images?.filter(({type}) => {
    switch (format) {
      case 'all':
        return true
      case 'img':
        return type === 'img' || type === 'bg-image'
      case 'icon':
        return type === 'icon'
      default:
        return false
    }
  })

  return (
    <section data-section="gallery-images" className={cn('grid grid-cols-3 gap-2', className)}>
      {filteredImages?.map(({src, type}, idx) => <ImageCell view="gallery" source={src} type={type} key={idx} />)}
    </section>
  )
}
