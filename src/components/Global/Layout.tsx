import Header from '~/Global/Header'
import Container from '~/Global/Container'
import {Toaster} from '~/UI/Sonner'

export default function Layout({children, className}: {children: React.ReactNode; className?: string}) {
  return (
    <>
      <Header />
      <Container className={className}>{children}</Container>

      <Toaster />
    </>
  )
}
