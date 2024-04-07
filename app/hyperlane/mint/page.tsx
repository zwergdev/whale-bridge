import {
  MintButton,
  MintChainPopover,
  MintImage,
  ReadMore,
} from './_components'

export default function HyperlaneMint() {
  return (
    <section className="flex max-w-screen-xl w-full min-h-[calc(100vh-160px)] flex-wrap items-center justify-center gap-16 pt-40">
      <div className="flex flex-col">
        <h2 className="font-semibold text-4xl mb-2.5">Mint NFT</h2>
        <h4 className="font-medium text-base mb-5 text-primary">
          TOTAL SUPPLY <span className="text-foreground">499999</span>
        </h4>
        <MintChainPopover />
        <ReadMore />
        <MintButton />
        {/* <TotalMinted /> */}
      </div>
      <MintImage />
    </section>
  )
}
