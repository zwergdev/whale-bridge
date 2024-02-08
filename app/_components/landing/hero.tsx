import { Button } from '@/components/ui/button-new'
import { LayerZeroLogo, Logo } from '@/components/ui/icons'
import Link from 'next/link'
import { Typing } from './typing'

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center relative w-full pt-40 min-h-[calc(100vh-100px)]">
      <div className="relative w-full max-w-screen-sm">
        <Logo className="w-full max-w-screen-sm h-auto md:mb-20 mb-10" />
        <Link
          href="https://layerzeroscan.com/protocol/whale"
          target="_blank"
          className="absolute flex items-center animate-pulse -top-20 left-1/2 -translate-x-1/2 bg-background border border-popover px-4 py-1.5 text-sm rounded-lg"
          style={{ boxShadow: '0 0 20px 1px #0d3b63' }}
        >
          Powered by <LayerZeroLogo className="w-4 h-4 mx-1" /> LayerZero
        </Link>
      </div>

      <Typing />

      <Link href="/mint">
        <Button>Launch App</Button>
      </Link>

      <div className="w-56 h-56 -z-20 bg-primary blur-[350px] absolute bottom-20 -right-20" />
      <div className="w-56 h-56 -z-20 bg-primary blur-[350px] absolute -top-10 -left-20" />
      <div className="w-56 h-56 -z-20 bg-popover blur-[250px] absolute bottom-20 -left-20" />
    </section>
  )
}
