import { Separator } from '@/components/ui'
import Link from 'next/link'
import { cloneElement } from 'react'
import { FooterNavigation } from './footer-navigation'
import { FOOTER_LINKS } from '@/lib/constants'
import { LayerZero, MobileLogo } from '@/components/ui/icons'

export const Footer = () => (
  <footer className="max-w-full mx-auto w-full text-foreground flex flex-col pb-4">
    <div className="container flex-center justify-between">
      <nav className="flex-center gap-10 lg:gap-12 font-medium">
        <Link href="/">
          <MobileLogo className="w-11 h-11" />
        </Link>
      </nav>
      <Link
        href="https://layerzero.network/"
        target="_blank"
        className="w-32 h-auto flex md:w-auto items-center"
      >
        <LayerZero />
      </Link>
    </div>

    <Separator className="mt-4 mb-3 bg-popover" />
    <div className="flex flex-col">
      <div className="flex w-full lg:gap-10 gap-5 container items-center justify-start font-medium text-sm flex-wrap">
        <FooterNavigation />
      </div>
      <Separator className="mb-4 mt-3 bg-popover" />
    </div>

    <div className="container flex-center-between">
      <div className="flex-center gap-4">
        {FOOTER_LINKS.map(({ icon, href }, idx) => (
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
