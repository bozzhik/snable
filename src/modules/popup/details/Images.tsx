import {type ImageData} from '_scripts/imagesExtractor'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import Gallery from '~~popup/images/Gallery'
import {ControlsBack} from '~~popup/colors/Controls'

export type ImagesResponse = {
  images: ImageData[]
}

export function Images() {
  const [imagesData, setImagesData] = useState<ImagesResponse>()

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'EXTRACT_IMAGES'}, (response: ImagesResponse) => {
        if (response) {
          setImagesData(response)
        }
      })
    })
  }, [])

  return (
    <Layout className="space-y-3.5">
      <ControlsBack />

      <Gallery data={imagesData} />
    </Layout>
  )
}
