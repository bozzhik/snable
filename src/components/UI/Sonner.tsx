import {Toaster as Sonner} from 'sonner'
import {cn} from '@/lib/utils'

type ToasterProps = React.ComponentProps<typeof Sonner>

export const Toaster = ({...props}: ToasterProps) => {
  return (
    <Sonner
      theme={'dark'}
      className="toaster group"
      position="bottom-center"
      gap={8}
      toastOptions={{
        classNames: {
          toast: cn('group toast', 'pl-3.5! pr-2.5! py-3!', 'bg-background! rounded-lg'),
          title: cn('text-sm! font-normal!'),
          actionButton: cn('bg-white! rounded-md', 'hover:bg-white/80! duration-200! transition-colors!'),
        },
        duration: 20000,
      }}
      {...props}
    />
  )
}
