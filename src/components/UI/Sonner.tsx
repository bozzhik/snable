import {Toaster as Sonner} from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

export const Toaster = ({...props}: ToasterProps) => {
  return (
    <Sonner
      theme={'dark'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group group-[.toaster]:p-0 toast flex justify-between group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          actionButton: 'group-[.toast]:bg-unit group-[.toast]:text-primary-foreground',
        },
      }}
      {...props}
    />
  )
}
