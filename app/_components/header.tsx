import { Separator } from '@/components/ui/separator'

import { Rotate3D } from 'lucide-react'
import Link from 'next/link'
import { ConnectButton } from './connect-button'
import { Navigation } from './navigation'

export const Header = () => {
  return (
    <header className="w-full text-foreground bg-background/50 backdrop-blur-xl py-2 border-b border-border">
      <div className="container flex justify-between items-center px-10">
        <nav className="flex items-center gap-8 text-sm">
          <Link href="/" className="flex items-center text-xl gap-2 font-bold">
            <Rotate3D size={24} strokeWidth={2} className="stroke-foreground" />
            Whale
          </Link>
          <Separator orientation="vertical" className="h-6 rotate-[30deg]" />

          <Navigation />
        </nav>

        <ConnectButton />
      </div>
    </header>
  )
}
