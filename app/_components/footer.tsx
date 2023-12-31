import { Rotate3D } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="flex w-full text-secondary text-sm bg-background/50 backdrop-blur-xl justify-between px-4 py-2 items-center border-t border-t-border">
      <nav className="flex items-center gap-4">
        <Link href="/">
          <Rotate3D size={24} strokeWidth={1.5} className="stroke-secondary" />
        </Link>
        <Link href="/">Home</Link>
        <Link href="/mint">Mint</Link>
        <Link href="/refuel">Refuel</Link>
      </nav>

      <p>Powered by LayerZero</p>
    </footer>
  )
}
