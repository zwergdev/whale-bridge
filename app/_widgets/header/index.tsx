import { MobileLogo } from '@/components/ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { MobileMenu } from './mobile-menu'
import { Navigation } from './navigation'
import { ProtocolNavigation } from './protocol-navigation'

export const Header = () => {
  return (
    <header className="w-full py-3 fixed top-0 border-b flex flex-col gap-2.5 border-b-popover bg-black/50 z-50 backdrop-blur-md">
      <nav className="container flex justify-between items-center md:px-10 px-3">
        <div className="gap-10 font-normal text-base flex">
          <Link
            href="/"
            className="mr-4 hover:scale-110 transition-transform duration-300"
          >
            <MobileLogo className="w-11 h-11" />
          </Link>

          <ProtocolNavigation />
        </div>

        <ConnectButton
          chainStatus="icon"
          accountStatus={{
            smallScreen: 'address',
            largeScreen: 'full',
          }}
        />

        <div className="xl:hidden block">
          <MobileMenu />
        </div>
      </nav>

      <div className="hidden container gap-10 xl:flex items-center">
        <Navigation />
      </div>
    </header>
  )
}
