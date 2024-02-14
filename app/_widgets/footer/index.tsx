import {
  Discord,
  LayerZero,
  MobileLogo,
  Telegram,
  Twitter,
} from '@/components/ui/icons'
import { GitBook } from '@/components/ui/icons/git-book'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { cloneElement } from 'react'
import { Navigation } from '../header/navigation'

export const Footer = () => (
  <footer className="max-w-full mx-auto w-full text-foreground flex flex-col pb-4">
    <div className="container flex items-center justify-between">
      <nav className="flex items-center gap-10 lg:gap-12 font-medium">
        <Link href="/">
          <MobileLogo className="w-11 h-11" />
        </Link>
        <div className="hidden lg:flex items-center gap-4 lg:gap-12">
          <Navigation isFooter />
          <Link
            target="_blank"
            href="https://layerzeroscan.com/protocol/whale"
            className="hover:text-primary transition-colors duration-300"
          >
            LayerZero.Scan
          </Link>
        </div>
      </nav>
      <Link
        href="https://layerzero.network/"
        target="_blank"
        className="w-32 h-auto flex md:w-auto items-center"
      >
        <LayerZero />
      </Link>
    </div>

    <Separator className="lg:my-4 my-4 bg-popover" />
    <div className="flex flex-col lg:hidden">
      <div className="flex w-full sm:gap-10 gap-5 items-center justify-center font-medium flex-wrap lg:hidden">
        <Navigation isFooter />
      </div>
      <Separator className="my-4 bg-popover" />
    </div>

    <div className="container flex justify-between items-center">
      <div className="flex items-center gap-4">
        {[
          { icon: <Telegram />, href: 'https://t.me/whale_app_com' },
          { icon: <Twitter />, href: 'https://twitter.com/Whale_app_' },
          { icon: <Discord />, href: 'https://discord.gg/SPyXDAps' },
          {
            icon: <GitBook style={{ width: '24px' }} />,
            href: 'https://whale-app.gitbook.io/whale-book/',
          },
        ].map(({ icon, href }, idx) => (
          <Link href={href} key={idx} target="_blank">
            {cloneElement(icon, {
              className:
                'fill-foreground hover:fill-primary transition-colors duration-300 w-5 h-auto',
            })}
          </Link>
        ))}
      </div>
      <p className="text-sm font-normal text-muted-foreground">
        © 2024 Whale App
      </p>
    </div>
  </footer>
)
