type Token = 'fonts' | 'colors' | 'images'

type Props = {
  token: Token
  children: React.ReactNode
}

export default function Unit({token, children}: Props) {
  return (
    <section data-section={`${token}-unit`} className="space-y-1">
      <h4 className="text-base text-gray first-letter:uppercase">{token}</h4>

      <div className="p-1.5 bg-unit rounded-lg">{children}</div>
    </section>
  )
}
