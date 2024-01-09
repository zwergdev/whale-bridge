import Link from 'next/link'
import { ConnectButton } from './connect-button'
import { Logo } from '@/components/ui/icons'
import { Navigation } from './navigation'
import { Separator } from '@/components/ui/separator'

export const Header = () => {
  return (
    <header className="w-full py-3 md:py-6">
      <nav className="container flex justify-between items-center md:px-10 px-4">
        <Link href="/">
          <Logo />
        </Link>

        <div className="gap-16 font-medium text-xl hidden md:flex">
          <Navigation />
        </div>

        <ConnectButton />
      </nav>

      <div className="flex flex-col md:hidden">
        <Separator className="my-4 bg-primary opacity-50" />
        <div className="flex w-full gap-10 items-center justify-center font-medium text-xl md:hidden">
          <Navigation />
        </div>
      </div>
    </header>
  )
}
