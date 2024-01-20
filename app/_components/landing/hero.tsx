import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/icons'
import Link from 'next/link'
import { Typing } from './typing'

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center font-black md:pt-14 pt-7 md:pb-40 pb-20 w-full">
      <Logo className="w-full max-w-screen-sm h-auto md:mb-20 mb-10" />

      <Typing />

      <Link href="/mint">
        <Button>Launch App</Button>
      </Link>
    </section>
  )
}
