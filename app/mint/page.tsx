import { MintButton } from './_сomponents/mint-button'
import { MintChainPopover } from './_сomponents/mint-chain-popover'
import { MintImage } from './_сomponents/mint-image'
import { ReadMore } from './_сomponents/read-more'
import { TotalMinted } from './_сomponents/total-minted'
import { TotalSupply } from './_сomponents/total-supply'

export default function MintPage() {
  return (
    <section className="flex max-w-screen-xl w-full flex-wrap items-center justify-center gap-16">
      <div className="flex flex-col">
        <h2 className="font-semibold text-4xl mb-2.5">Mint NFT</h2>
        <TotalSupply />
        <MintChainPopover />
        <ReadMore />
        <MintButton />
        <TotalMinted />
      </div>
      <MintImage />
    </section>
  )
}
