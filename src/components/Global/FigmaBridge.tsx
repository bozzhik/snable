import type {Units} from '_scripts/index'
import {EXT_VERSION} from '@/lib/constants'

import {useState} from 'react'
import {cn} from '@/lib/utils'

export default function FigmaBridge({data}: {data?: Units}) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToFigma = () => {
    if (!data) return

    const figmaData = {
      version: EXT_VERSION,
      units: {
        colors: data.colors?.map((item) => ({
          value: item.color,
          isContrasted: item.isContrasted,
        })),
        fonts: data.fonts?.map((item) => ({
          font: item.font,
          weights: item.weights,
        })),
        images: data.images?.map((item) => ({
          type: item.type,
          src: item.src,
          name: item.name,
        })),
      },
    }

    navigator.clipboard
      .writeText(JSON.stringify(figmaData, null, 2))
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1000)
        console.log('Data copied for Figma plugin')
      })
      .catch((err) => {
        console.error('Failed to copy data:', err)
      })
  }

  return (
    <button
      onClick={handleCopyToFigma}
      className={cn(
        'p-1.5 w-full flex items-center justify-center',
        'bg-unit rounded-lg',
        'hover:bg-control duration-300', // on hover
      )}
    >
      {isCopied ? 'Copied' : 'Copy to Figma'}
    </button>
  )
}
