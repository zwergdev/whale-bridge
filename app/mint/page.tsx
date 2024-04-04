import {
  MintButton,
  MintChainPopover,
  MintImage,
  ReadMore,
  TotalMinted,
  TotalSupply,
} from '@/app/mint/_сomponents'

export default function MintPage() {
  return (
    <section className="flex max-w-screen-xl w-full min-h-[calc(100vh-160px)] flex-wrap items-center justify-center gap-16 pt-40">
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
