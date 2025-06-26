import figmaIcon from '$/figma.svg'

import {EXT_VERSION} from '@/lib/constants'

import {useState} from 'react'

import {cn} from '@/lib/utils'
import {toast} from 'sonner'

import {H3} from '~/UI/Typography'

export default function FigmaBridge() {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToFigma = () => {
    const figmaData = {
      version: EXT_VERSION,
      units: null,
    }

    navigator.clipboard
      .writeText(JSON.stringify(figmaData, null, 2))
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1000)
        console.log('Data copied for Figma plugin')
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
