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

  return (
    <a href={source} className={cn('w-full h-20 rounded-lg bg-control/70', 'grid place-items-center overflow-hidden group', !isDetails && 'h-auto bg-control/40', isIcon && (!isDetails ? 'p-4' : 'p-0'))} target="_blank" onClick={handleClick}>
      <img src={source} className={cn('w-full h-full object-center group-hover:scale-[1.05] duration-300', isDetails ? 'object-cover' : 'object-contain', isIcon && isDetails && 'size-[70%]')} alt={type} />
    </a>
  )
}
