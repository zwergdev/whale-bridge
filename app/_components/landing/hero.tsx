import { Button } from '@/components/ui/button-new'
import { LayerZeroLogo, Logo } from '@/components/ui/icons'
import heroImage from '@/public/general/hero.webp'
import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center relative w-full sm:pt-40 pt-40 min-h-[calc(100vh-100px)]">
      <div className="flex items-center lg:justify-between justify-center lg:gap-0 gap-14 w-full h-full lg:flex-row flex-col">
        <div className="flex flex-col lg:items-start items-center justify-center w-full">
          <div className="w-full max-w-screen-sm relative">
            <Link
              href="https://layerzeroscan.com/protocol/whale"
              target="_blank"
              className="absolute flex items-center animate-pulse -top-20 w-52 left-1/2 -translate-x-1/2 bg-background border border-popover px-4 py-1.5 text-sm rounded-lg"
              style={{ boxShadow: '0 0 20px 1px #0d3b63' }}
            >
              Powered by <LayerZeroLogo className="w-4 h-4 mx-1" /> LayerZero
            </Link>

            <Logo className="w-full max-w-screen-sm h-auto mb-10" />
          </div>

          <h1 className="text-foreground opacity-80 max-w-screen-sm md:text-2xl sm:text-xl text-lg font-semibold lg:text-left text-center">
            A multifunctional omnichain solution powered by LayerZero. Mint &
            Bridge NFTs and Tokens, Refuel Gas, Send Messages.
          </h1>

          <Link href="/mint" className="mt:mb-16 mt-10">
            <Button className="w-80">Launch App</Button>
          </Link>
        </div>

        <Image
          src={heroImage}
          alt="hero-image"
          priority
          className="w-full lg:ml-10 ml-0 lg:w-1/2"
        />
      </div>

      <div className="w-56 h-56 -z-20 bg-primary blur-[350px] absolute bottom-20 -right-20" />
      <div className="w-56 h-56 -z-20 bg-primary blur-[350px] absolute -top-10 -left-20" />
      <div className="w-56 h-56 -z-20 bg-popover blur-[250px] absolute bottom-20 -left-20" />
    </section>
  )
}
