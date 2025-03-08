import type {ImagesResponse} from '_modules/popup/details/Images'

import ImageCell from '~/UI/ImageCell'

export default function Gallery({data}: {data: ImagesResponse | undefined}) {
  return (
    <section data-section="gallery-images" className="grid grid-cols-3 gap-2">
      {data?.images?.map(({src, type}, idx) => <ImageCell view="gallery" source={src} type={type} key={idx} />)}
    </section>
  )
}
