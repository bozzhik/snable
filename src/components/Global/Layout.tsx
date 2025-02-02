import Header from '~/Global/Header'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
