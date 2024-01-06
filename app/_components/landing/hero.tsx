import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/icons'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center font-black pt-14 pb-40">
      <Logo className="w-[652px] h-[133px] mb-20" />
      <p className="text-foreground mb-16 text-2xl font-light max-w-screen-md text-center">
        Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus
        vel molestie non dictum.
      </p>

      <Button>
        <Link href="/mint">Launch App</Link>
      </Button>
    </section>
  )
}
