import figmaIcon from '$/figma.svg'

import type {Units} from '_scripts/index'
import type {TabInfo} from '_bg/getTabData'
import {EXT_VERSION, FIGMA_PLUGIN_URL} from '@/lib/constants'
import {ROUTES} from '@/lib/routes'

import {developerController} from '@/lib/developer-controller'
import {userController} from '@/lib/user-controller'

import {useState, useEffect} from 'react'
import {useHashLocation} from 'wouter/use-hash-location'

import {cn} from '@/lib/utils'
import {toast} from 'sonner'

import {H3} from '~/UI/Typography'

export function FigmaBridgeButton({mode, data}: {mode: 'bridge' | 'page'; data: Units | null}) {
  const [, navigate] = useHashLocation()

  const [isCopied, setIsCopied] = useState(false)
  const [tabData, setTabData] = useState<TabInfo>({} as TabInfo)
  const [hasPlugin, setHasPlugin] = useState(false)

  useEffect(() => {
    setHasPlugin(developerController.isPluginEnabled)

    chrome.runtime.sendMessage({type: 'GET_TAB_INFO'}, (response) => {
      if (response?.url) {
        setTabData(response)
      }
    })
  }, [])

  const handleButtonClick = () => {
    if (mode === 'page') {
      handleCopyToFigma()
      return
    }

    if (hasPlugin) {
      handleCopyToFigma()
    } else {
      navigate(ROUTES.figma)
    }
  }

  const handleCopyToFigma = () => {
    if (!data) return toast('No data was found for this request.')

    const figmaData = {
      version: EXT_VERSION,
      snabled: {
        title: tabData.title,
        url: tabData.url,
      },
      units: {
        colors: data.colors?.map((item) => ({
          value: item.color,
          isContrasted: item.isContrasted,
        })),
        fonts: data.fonts?.map((item) => ({
          font: item.font,
          weights: item.weights,
        })),
        images: data.images
          ?.filter((item) => item.type === 'icon')
          .map((item) => ({
            type: item.type,
            src: item.src,
            name: item.name,
          })),
      },
    }

    navigator.clipboard
      .writeText(JSON.stringify(figmaData, null, 2))
      .then(() => {
        if (tabData.url) {
          userController.trackFigmaBridge({incrementClick: true, addUrl: tabData.url})
        }

        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1000)
        console.log('Data copied for Figma plugin', figmaData)
        toast('Copied! Go to Snable Figma Plugin', {
          action: {
            label: 'Get plugin',
            onClick: () => {
              chrome.tabs.create({url: FIGMA_PLUGIN_URL})
            },
          },
          duration: 4000,
        })
      })
      .catch((err) => {
        console.error('Failed to copy data:', err)
        toast('Copy failed! Looks like a dev task.')
      })
  }

  const getButtonText = () => {
    if (mode === 'page') {
      return 'Copy to Figma'
    }

    if (hasPlugin) {
      return isCopied ? 'Copied' : 'Copy to Figma'
    }
    return 'Export to Figma'
  }

  return (
    <button onClick={handleButtonClick} className={cn('py-2.5 w-full', 'flex items-center justify-center gap-1.25', 'bg-control text-gray rounded-lg', 'hover:bg-unit duration-300 ', 'group cursor-pointer')}>
      <img src={figmaIcon} className={cn('size-[19px]', 'object-contain', 'group-hover:scale-[1.1] duration-300')} />
      <H3 className="text-gray group-hover:text-white duration-300">{getButtonText()}</H3>
    </button>
  )
}

export default function FigmaBridge({data}: {data: Units | null}) {
  return <FigmaBridgeButton mode="bridge" data={data} />
}
