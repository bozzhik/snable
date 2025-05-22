import {Download} from 'lucide-react'
import type {ImageType} from '_scripts/imagesExtractor'

import {cn} from '@/lib/utils'

type Props = {
  source: string
  type: ImageType
  view: 'details' | 'gallery'
}

export default function ImageCell({source, type, view}: Props) {
  const isDetails = view === 'details'
  const isIcon = type === 'icon'

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (type === 'icon' && source.startsWith('data:')) {
      e.preventDefault()

      const win = window.open()
      if (win) {
        win.document.write(`
          <html>
            <head><title>Snable Icon Preview</title></head>
            <body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#ccc">
              <img src="${source}" style="max-width:100%;max-height:80vh" />
            </body>
          </html>
        `)
      }
    }
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (type === 'icon' && source.startsWith('blob:')) {
      fetch(source)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          const fileName = source.split('/').pop()?.split('?')[0] || 'icon'
          a.download = fileName.endsWith('.svg') ? fileName : `${fileName}.svg`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        })
    } else {
      const a = document.createElement('a')
      a.href = source
      const fileName = source.split('/').pop() || 'image'
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <a href={source} className={cn('relative w-full h-20 rounded-lg bg-control/70', 'grid place-items-center overflow-hidden group/cell', !isDetails && 'h-auto bg-unit-dark', isIcon && (!isDetails ? 'p-4' : 'p-0'))} target="_blank" onClick={handleClick}>
      <img src={source} className={cn('w-full h-full object-center group-hover/cell:scale-[1.05] duration-300', isDetails ? 'object-cover' : 'object-contain', isIcon && (isDetails ? 'size-[70%]' : 'size-[90%]'))} alt={type} />

      <button
        onClick={handleDownload}
        className={cn(
          'absolute size-fit grid place-items-center cursor-pointer group/button',
          isDetails ? 'bottom-1 left-1 p-[5px]' : 'inset-1.5 p-1.5', // based on view
          'opacity-0 bg-background/90 rounded-sm',
          'group-hover/cell:opacity-100 duration-200',
        )}
      >
        <Download
          className={cn(
            isDetails ? 'size-4.5' : 'size-6', // based on view
            'text-white group-hover/button:text-gray',
            ' group-hover/button:scale-[1.07] duration-300',
          )}
          strokeWidth={1.7}
        />
      </button>
    </a>
  )
}
