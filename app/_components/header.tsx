import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import mobileLogo from '../icon.png'
import { ConnectButton } from './connect-button'
import { Navigation } from './navigation'

export const Header = () => {
  return (
    <header className="w-full py-3 md:py-6 fixed top-0 bg-black/50 z-50 backdrop-blur-md">
      <nav className="container flex justify-between items-center md:px-10 px-2">
        <h1 className="hidden">Whale Bridge</h1>
        <Link href="/">
          <Logo className="hidden sm:block" />
          <Image
            src={mobileLogo}
            width={48}
            height={48}
            alt="logo"
            loading="lazy"
            className="sm:hidden block ml-2"
          />
        </Link>

        <div className="gap-16 font-medium text-xl hidden md:flex">
          <Navigation />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button
              variant="secondary"
              className="p-2.5 before:scale-x-[1.1] before:scale-y-[1.1]"
            >
              <UserRound size={28} />
            </Button>
          </Link>

          <ConnectButton />
        </div>
      </nav>

      <div className="flex flex-col md:hidden">
        <Separator className="my-4 bg-primary opacity-50" />
        <div className="flex w-full sm:gap-10 gap-5 items-center justify-center font-medium text-xl md:hidden">
          <Navigation />
        </div>
      </div>
    </header>
  )
}
