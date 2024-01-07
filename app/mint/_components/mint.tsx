import { CHAINS } from '@/app/_utils/chains'
import Image from 'next/image'
import { MintButton } from './mint-button/mint-button'

type MintPageProps = {
  changePage: () => void
}

export const MintPage = ({ changePage }: MintPageProps) => {
  return (
    <section className="flex gap-36 items-center justify-center">
      <div className="flex flex-col">
        <h2 className="font-semibold text-4xl mb-5">Mint NFT</h2>
        <div className="mb-10 rounded-full w-fit border border-primary flex items-center gap-2.5 justify-start p-2.5">
          {CHAINS.map(({ image }) => (
            <Image src={image} alt="chain-picture" width={30} height={30} />
          ))}
          And 21 More Chains
        </div>
        <p className="font-medium text-2xl mb-8 max-w-lg">
          Nisi quam, interdum nunc faucibus. Elit. Aenean platea malesuada ipsum
          pulvinar amet, vulputate ornare dapibus odio. Mauris risus vestibulum
          orci, eleifend eleifend integer arcu dolor consectetur quam, sit
          efficitur est.
        </p>
        <MintButton changePage={changePage} />
      </div>
      <Image
        src="/whale.jpg"
        width={440}
        height={440}
        className="rounded-xl"
        alt="mint-picture"
      />
    </section>
  )
}
