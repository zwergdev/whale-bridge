import { MintButton } from './_сomponents/mint-button'
import { MintImage } from './_сomponents/mint-image'
import { MintChainPopover } from './_сomponents/mint-chain-popover'

export default function MintPage() {
  return (
    <section className="flex max-w-screen-xl w-full flex-wrap items-center justify-center gap-16">
      <div className="flex flex-col">
        <h2 className="font-semibold text-4xl mb-5">Mint NFT</h2>
        <MintChainPopover />
        <p className="font-medium md:text-2xl text-xl mb-8 max-w-lg">
          We want you to understand that you're not just creating an NFT, you're
          contributing to a revolutionary story, where art takes on a new
          dimension, and each creation becomes a chapter in the evolving
          narrative of digital creativity. Welcome to the captivating world of
          digital art.
        </p>
        <MintButton />
      </div>
      <MintImage />
    </section>
  )
}
