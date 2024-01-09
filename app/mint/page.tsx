import { CHAINS } from '@/app/_utils/chains'
import Image from 'next/image'
import { MintButton } from './mint-button/mint-button'

export default function MintPage() {
  return (
    <section className="flex max-w-screen-xl w-full flex-wrap items-center justify-center gap-16">
      <div className="flex flex-col">
        <h2 className="font-semibold text-4xl mb-5">Mint NFT</h2>
        <div className="mb-10 rounded-full w-fit border border-primary flex items-center gap-2.5 justify-start p-2.5">
          {CHAINS.map(({ image }, idx) => (
            <Image
              key={idx}
              src={image}
              alt="chain-picture"
              width={30}
              height={30}
            />
          ))}
          And 21 More Chains
        </div>
        <p className="font-medium md:text-2xl text-xl mb-8 max-w-lg">
          Nisi quam, interdum nunc faucibus. Elit. Aenean platea malesuada ipsum
          pulvinar amet, vulputate ornare dapibus odio. Mauris risus vestibulum
          orci, eleifend eleifend integer arcu dolor consectetur quam, sit
          efficitur est.
        </p>
        <MintButton />
      </div>
      <Image
        src="/mint-nft.webp"
        width={440}
        height={440}
        className="rounded-xl"
        alt="mint-picture"
      />
    </section>
  )
}
