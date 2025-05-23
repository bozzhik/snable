import type {Units} from '_scripts/index'
import {useState} from 'react'

interface FigmaIntegrationProps {
  data?: Units
}

export default function FigmaIntegration({data}: FigmaIntegrationProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToFigma = () => {
    if (!data) return

    const figmaData = {
      fonts: data.fonts?.map((font) => ({
        name: font.font,
        weights: font.weights,
      })),
      colors: data.colors?.map((color) => ({
        value: color.color,
        isContrasted: color.isContrasted,
      })),
      images: data.images?.map((image) => ({
        type: image.type,
        src: image.src,
        name: image.name,
      })),
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
      className="w-full flex items-center justify-center gap-2 py-2 px-4
                 bg-unit hover:bg-control rounded-lg
                 text-white text-sm font-medium"
    >
      {isCopied ? 'Скопировано!' : 'Копировать в Figma'}
    </button>
  )
}
