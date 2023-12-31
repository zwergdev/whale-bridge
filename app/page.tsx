import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center font-black mb-24">
        <h1 className="bg-gradient-to-tl from-primary to-zinc-200 to-80% bg-clip-text text-transparent text-7xl mb-2 ">
          Where chain matters
        </h1>
        <p className="text-secondary mb-4 text-xl font-medium tracking-wide">
          Mint, bridge, and refuel assets across the chains.
        </p>

        <Button asChild>
          <Link href="/mint">Launch App</Link>
        </Button>
      </div>
      <div className="w-2/3 h-96 rounded-xl bg-[url('/hero.png')] brightness-75 bg-no-repeat bg-center bg-cover border border-border" />
    </>
  )
}
