import { Telegram, Twitter } from '@/components/ui/icons'
import { Rotate3D } from 'lucide-react'
import Link from 'next/link'
import { Navigation } from '@/app/_components/navigation'

export const Footer = () => (
  <footer className="w-full text-secondary text-sm bg-background/50 backdrop-blur-xl py-2 border-t border-t-border">
    <div className="container flex justify-between items-center px-10">
      <nav className="flex items-center gap-4">
        <Link href="/">
          <Rotate3D
            size={24}
            strokeWidth={1.5}
            className="stroke-secondary hover:stroke-foreground transition-colors duration-300"
          />
        </Link>
        <Navigation />
      </nav>

      <div className="flex items-center gap-4">
        <Link href="#">
          <Telegram className="fill-secondary hover:fill-foreground transition-colors duration-300" />
        </Link>
        <Link href="#">
          <Twitter className="fill-secondary hover:fill-foreground transition-colors duration-300" />
        </Link>

        <p>Powered by LayerZero</p>
      </div>
    </div>
  </footer>
)
