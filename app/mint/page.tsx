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
          Nisi quam, interdum nunc faucibus. Elit. Aenean platea malesuada ipsum
          pulvinar amet, vulputate ornare dapibus odio. Mauris risus vestibulum
          orci, eleifend eleifend integer arcu dolor consectetur quam, sit
          efficitur est.
        </p>
        <MintButton />
      </div>
      <MintImage />
    </section>
  )
}
