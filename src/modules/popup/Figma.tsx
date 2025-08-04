import bridgeImage from '$/figma-bridge.png'

import type {Units} from '_scripts/index'
import {FIGMA_PLUGIN_URL} from '@/lib/constants'
import {ROUTES} from '@/lib/routes'

import {developerController} from '@/lib/developer-controller'
import {cn} from '@/lib/utils'

import {useEffect, useState} from 'react'
import {useHashLocation} from 'wouter/use-hash-location'

import Layout from '~/Global/Layout'
import {ControlsBack} from '~/UI/Controls'
import {H1, H3, SPAN} from '~/UI/Typography'
import {FigmaBridgeButton} from '~/Global/FigmaBridge'

export function Figma() {
  const [, navigate] = useHashLocation()
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

  const handleEnablePlugin = () => {
    developerController.markPluginOnboarded()
    navigate(ROUTES.home)
  }

  return (
    <Layout className="space-y-2.5">
      <ControlsBack />

      <div className={cn('pt-5', 'flex flex-col gap-8', 'text-center')}>
        <div className="space-y-4">
          <H1>Figma Integration</H1>

          <img className="w-[45%] mx-auto object-contain" src={bridgeImage} />
        </div>

        <div className="space-y-4">
          <H3>
            Run{' '}
            <a href={FIGMA_PLUGIN_URL} className="text-gray-dark underline hover:no-underline underline-offset-2" target="_blank">
              Snable Figma Plugin
            </a>
            , click the copy button, and paste collected data into Figma Plugin.{' '}
            <a href="https://link.snable.website/guide" className="text-gray-dark underline hover:no-underline underline-offset-2" target="_blank">
              Guide
            </a>
          </H3>

          <div className="space-y-1.5">
            <FigmaBridgeButton mode="page" data={units || null} />

            <div className="cursor-pointer group" onClick={handleEnablePlugin}>
              <SPAN className="text-gray group-hover:underline underline-offset-2">Don't show this page again</SPAN>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
