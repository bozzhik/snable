import {Toaster as Sonner} from 'sonner'
import {cn} from '@/lib/utils'

type ToasterProps = React.ComponentProps<typeof Sonner>

export const Toaster = ({...props}: ToasterProps) => {
  return (
    <Sonner
      theme={'dark'}
      mobileOffset={'10px'}
      visibleToasts={3}
      className="toaster group"
      position="bottom-center"
      gap={8}
      toastOptions={{
        classNames: {
          toast: cn('group toast', '!pl-3.5 !pr-2 !py-2', 'bg-background! rounded-lg'),
          title: cn('text-base !font-normal'),
          actionButton: cn('!py-3.5', 'bg-white! rounded-md', '!text-sm !font-medium', 'hover:bg-white/80! duration-200! transition-colors!'),
        },
        duration: 2000,
      }}
      {...props}
    />
  )
}
