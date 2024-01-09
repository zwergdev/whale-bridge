import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/icons'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center font-black md:pt-14 pt-7 md:pb-40 pb-20">
      <Logo className="w-full max-w-screen-sm h-auto md:mb-20 mb-10" />
      <p className="text-foreground md:mb-16 mb-10 md:text-2xl text-xl font-light max-w-screen-md text-center">
        Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus
        vel molestie non dictum.
      </p>

      <Button>
        <Link href="/mint">Launch App</Link>
      </Button>
    </section>
  )
}
