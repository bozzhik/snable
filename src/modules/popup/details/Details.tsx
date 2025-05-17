import type {Units} from '_scripts/index'
import {useEffect, useState} from 'react'

import Layout from '~/Global/Layout'
import FontsUnit from '~~popup/details/FontsUnit'
import ColorsUnit from '~~popup/details/ColorsUnit'
import ImagesUnit from '~~popup/details/ImagesUnit'

export function Details() {
  const [units, setUnits] = useState<Units>()

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {type: 'EXTRACT_UNITS'}, (response: Units) => {
        if (response) {
          setUnits(response)
        }
      })
    })
  }, [])

  return (
    <Layout className="space-y-2.5">
      <FontsUnit data={units?.fonts} />
      <ColorsUnit data={units?.colors} />
      <ImagesUnit data={units?.images} />

      <p className="text-xs text-gray-dark text-center leading-none group">
        we use data for advertising. check{' '}
        <a className="text-gray-medium underline underline-offset-1 group-hover:no-underline" href="https://github.com/bozzhik/snable/blob/main/PRIVACY_POLICY.md" target="_blank">
          privacy policy
        </a>
      </p>
    </Layout>
  )
}
