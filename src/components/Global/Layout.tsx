import Header from '~/Global/Header'
import Container from '~/Global/Container'

export default function Layout({children, className}: {children: React.ReactNode; className?: string}) {
  return (
    <>
      <Header />
      <Container className={className}>{children}</Container>
    </>
  )
}
