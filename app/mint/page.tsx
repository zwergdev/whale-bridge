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
          Release the whale in you and dive into the exciting ocean of
          cryptocurrency. You're not just minting an NFT, you're writing history
          in the ledger of digital art. Don't be a small fish, become a crypto
          whale and make a splash in the sea of success. This NFT help you!
        </p>
        <MintButton />
      </div>
      <MintImage />
    </section>
  )
}
