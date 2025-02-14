import {cn} from '@/lib/utils'

export const BOX_STYLES = 'p-3.5'

export default function Container({children, className}: {children: React.ReactNode; className?: string}) {
  return <main className={cn(BOX_STYLES, className)}>{children}</main>
}
