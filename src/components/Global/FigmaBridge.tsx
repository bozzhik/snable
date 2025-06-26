import figmaIcon from '$/figma.svg'

import type {Units} from '_scripts/index'
import {EXT_VERSION} from '@/lib/constants'

import {useState} from 'react'

import {cn} from '@/lib/utils'
import {toast} from 'sonner'

import {H3} from '~/UI/Typography'

export default function FigmaBridge({data}: {data: Units | null}) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToFigma = () => {
    if (!data) return toast('No data found')

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
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1000)
        console.log('Data copied for Figma plugin', figmaData)
        toast('Data copied for Figma plugin')
      })
      .catch((err) => {
        console.error('Failed to copy data:', err)
        toast('Failed to copy data. Contact developer')
      })
  }

  return (
    <button
      onClick={handleCopyToFigma}
      className={cn(
        'py-2 w-full group',
        'flex items-center justify-center gap-1',
        'bg-unit text-gray rounded-lg',
        'hover:bg-control duration-300 ', // on hover
      )}
    >
      <img src={figmaIcon} className={cn('size-[19px]', 'object-contain', 'group-hover:scale-[1.07] duration-300')} />
      <H3>{isCopied ? 'Copied' : 'Copy to Figma'}</H3>
    </button>
  )
}
