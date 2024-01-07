import { LayerZero, Logo, Telegram, Twitter } from '@/components/ui/icons'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Navigation } from './navigation'
import { cloneElement } from 'react'

export const Footer = () => (
  <footer className="max-w-screen-xl mx-auto w-full text-foreground flex flex-col pb-12">
    <div className="flex items-center justify-between">
      <nav className="flex items-center gap-12 font-medium">
        <Link href="/">
          <Logo />
        </Link>
        <Navigation />
        <Link
          href="https://layerzeroscan.com/"
          className="hover:text-primary transition-colors duration-300"
        >
          LayerZero.Scan
        </Link>
      </nav>
      <LayerZero />
    </div>

    <Separator className="my-6 bg-primary" />

    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {[<Telegram />, <Twitter />].map((item) => (
          <Link href="#" className="">
            {cloneElement(item, {
              className:
                'fill-foreground hover:fill-primary transition-colors duration-300 w-6 h-auto',
            })}
          </Link>
        ))}
      </div>
      <p className="text-sm font-medium">© Whale.com</p>
    </div>
  </footer>
)
