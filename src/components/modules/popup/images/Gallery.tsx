import type {ImagesResponse} from '_modules/popup/details/Images'

import ImageCell from '~/UI/ImageCell'

export default function Gallery({data}: {data: ImagesResponse | undefined}) {
  return (
    <section data-section="gallery-images" className="grid grid-cols-2 gap-2">
      {data?.images?.map(({src, type}) => <ImageCell source={src} className="h-36 bg-control/40" type={type} />)}
    </section>
  )
}
