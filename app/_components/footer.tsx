import { LayerZero, Logo, Telegram, Twitter } from '@/components/ui/icons'
import { GitBook } from '@/components/ui/icons/git-book'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { cloneElement } from 'react'
import { Navigation } from './navigation'

export const Footer = () => (
  <footer className="max-w-full mx-auto w-full text-foreground flex flex-col pb-4 md:pb-12">
    <div className="container flex items-center justify-between">
      <nav className="flex items-center gap-10 lg:gap-12 font-medium">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-4 lg:gap-12">
          <Navigation />
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
        className="w-36 h-auto flex md:w-auto items-center"
      >
        <LayerZero />
      </Link>
    </div>

    <Separator className="md:my-6 my-4 bg-primary" />
    <div className="flex flex-col md:hidden">
      <div className="flex w-full sm:gap-10 gap-5 items-center justify-center font-medium text-xl md:hidden">
        <Navigation />
      </div>
      <Separator className="my-4 bg-primary" />
    </div>

    <div className="container flex justify-between items-center">
      <div className="flex items-center gap-4">
        {[
          { icon: <Telegram />, href: 'https://t.me/whale_app_com' },
          { icon: <Twitter />, href: 'https://twitter.com/Whale_app_' },
          {
            icon: <GitBook style={{ width: '28px' }} />,
            href: 'https://whale-app.gitbook.io/whale-book/',
          },
        ].map(({ icon, href }, idx) => (
          <Link href={href} key={idx} target="_blank">
            {cloneElement(icon, {
              className:
                'fill-foreground hover:fill-primary transition-colors duration-300 w-6 h-auto',
            })}
          </Link>
        ))}
      </div>
      <p className="text-sm font-medium">© whale-app.com</p>
    </div>
  </footer>
)
