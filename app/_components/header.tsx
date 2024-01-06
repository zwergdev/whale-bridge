import Link from 'next/link'
import { ConnectButton } from './connect-button'
import { Logo } from '@/components/ui/icons'
import { Navigation } from './navigation'

export const Header = () => {
  return (
    <header className="w-full text-foreground py-6">
      <nav className="container flex justify-between items-center px-10">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex gap-16 font-medium text-xl">
          <Navigation />
        </div>

        <ConnectButton />
      </nav>
    </header>
  )
}
