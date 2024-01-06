import { LayerZero, Logo, Telegram, Twitter } from '@/components/ui/icons'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Navigation } from './navigation'

export const Footer = () => (
  <footer className="max-w-screen-xl mx-auto w-full text-foreground flex flex-col pb-12">
    <div className="flex items-center justify-between">
      <nav className="flex items-center gap-12 font-medium">
        <Logo />
        <Navigation />
        <Link href="https://layerzeroscan.com/">LayerZero.Scan</Link>
      </nav>
      <LayerZero />
    </div>

    <Separator className="my-6 bg-[#3fa6b4]" />

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="#">
          <Telegram className="fill-foreground hover:fill-secondary transition-colors duration-300 w-6 h-auto" />
        </Link>
        <Link href="#">
          <Twitter className="fill-foreground hover:fill-secondary transition-colors duration-300 w-6 h-auto" />
        </Link>
      </div>
      <p className="text-sm font-medium">© Whale.com</p>
    </div>
  </footer>
)
