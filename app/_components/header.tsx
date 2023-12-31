import { Separator } from '@/components/ui/separator'

import { Rotate3D } from 'lucide-react'
import Link from 'next/link'
import { ConnectButton } from './connect-button'

export const Header = () => {
  return (
    <header className="flex w-full text-foreground justify-between bg-background/50 backdrop-blur-xl px-4 py-2 items-center border-b border-border">
      <nav className="flex items-center gap-8 text-sm">
        <Link href="/" className="flex items-center text-xl gap-2 font-bold">
          <Rotate3D size={24} strokeWidth={2} className="stroke-foreground" />
          Whale
        </Link>
        <Separator orientation="vertical" className="h-6 rotate-[30deg]" />
        <Link href="/">Home</Link>
        <Link href="/mint">Mint</Link>
        <Link href="/refuel">Refuel</Link>
      </nav>

      <ConnectButton />
    </header>
  )
}
