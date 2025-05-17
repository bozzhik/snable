import {types, ImageData, ImageType} from '_scripts/imagesExtractor'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import Controls, {ControlsTabItem, CONTROLS_GAP} from '~/UI/Controls'
import Gallery from '~~popup/images/Gallery'

export type ImageMode = Exclude<ImageType, 'bg-image'> | 'all'

export type ImagesResponse = {
  images: ImageData[]
}

export function Images() {
  const [imagesData, setImagesData] = useState<ImagesResponse>()
  const [imageFormat, setImageFormat] = useState<ImageMode>('all')

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'EXTRACT_IMAGES'}, (response: ImagesResponse) => {
        if (response) {
          setImagesData(response)
        }
      })
    })
  }, [])

  const handleFormatChange = (format: ImageMode) => {
    setImageFormat(format)
  }

  return (
    <Layout className="space-y-3.5">
      <Controls>
        {['all', ...types.filter((type) => type !== 'bg-image')].map((type) => (
          <ControlsTabItem item={type} isSelected={type === imageFormat} onClick={() => handleFormatChange(type as ImageMode)} key={type} />
        ))}
      </Controls>

      <Gallery data={imagesData} format={imageFormat} className={CONTROLS_GAP} />
    </Layout>
  )
}
