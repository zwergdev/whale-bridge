import { MobileLogo } from '@/components/ui/icons'
import Link from 'next/link'
import { Navigation } from '../navigation'
import { MobileMenu } from './mobile-menu'

export const Header = () => {
  return (
    <header className="w-full py-3 fixed top-0 border-b border-b-popover bg-black/50 z-50 backdrop-blur-md">
      <nav className="container flex justify-between items-center md:px-10 px-3">
        <div className="gap-10 font-normal text-base flex">
          <Link
            href="/"
            className="mr-4 hover:scale-110 transition-transform duration-300"
          >
            <MobileLogo className="w-11 h-11" />
          </Link>

          <div className="hidden gap-10 lg:flex items-center">
            <Navigation />
          </div>
        </div>

        <w3m-button />

        <div className="lg:hidden block">
          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}
