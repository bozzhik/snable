import bridgeImage from '$/figma-bridge.png'

import {FIGMA_PLUGIN_URL} from '@/lib/constants'

import {cn} from '@/lib/utils'

import Layout from '~/Global/Layout'
import {ControlsBack} from '~/UI/Controls'
import {H1, H3} from '~/UI/Typography'

export function Figma() {
  return (
    <Layout className="space-y-2.5">
      <ControlsBack />

      <div className={cn('pt-5 pb-0.25', 'flex flex-col gap-8', 'text-center')}>
        <div className="space-y-4">
          <H1>Figma Integration</H1>

          <img className="w-[45%] mx-auto object-contain" src={bridgeImage} />
        </div>

        <H3>
          Run{' '}
          <a href={FIGMA_PLUGIN_URL} className="text-gray-dark underline hover:no-underline underline-offset-2" target="_blank">
            Snable Figma Plugin
          </a>
          , click the copy button, and paste the collected data into Figma Plugin.
          {/* <a href="https://snable.website/figma-plugin-guide" className="text-gray-dark underline hover:no-underline underline-offset-2" target="_blank">
              Guide
            </a> */}
        </H3>
      </div>
    </Layout>
  )
}
