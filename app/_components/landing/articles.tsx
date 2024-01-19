import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { SectionWrapper } from './misc'
import mintNFT from '../../../public/mint-nft.webp'
import bridgeNFT from '../../../public/nft-bridge.webp'
import bridge from '../../../public/bridge-menu.webp'
import refuelNFT from '../../../public/refuel-nft.webp'
import refuel from '../../../public/refuel-menu.webp'

type ArticleProps = {
  children: React.ReactNode
  revert?: boolean
  title: string
  bio: string[]
  button: {
    text: string
    link: string
  }
}

const Article = ({
  children,
  revert = false,
  title,
  bio,
  button,
}: ArticleProps) => {
  return (
    <article
      className={cn(
        'flex md:items-start items-center flex-col justify-center gap-10 mb-20 last:mb-12',
        revert ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-primary md:text-4xl text-2xl font-semibold md:mb-10 mb-5">
          {title}
        </h3>
        {bio.map((text, idx) => (
          <p
            key={idx}
            className="before:content-[''] before:w-full before:max-w-5 before:h-5 before:rounded-full before:bg-primary before:block before:relative before:top-1 before:drop-shadow-[0_0_4px_#30DDF4] flex items-start gap-5 md:text-2xl text-base sm:text-xl font-medium mb-5 max-w-[500px]"
          >
            {text}
          </p>
        ))}

        <Link href={button.link}>
          <Button className="w-32 md:mt-10 mt-0" variant="secondary">
            {button.text}
          </Button>
        </Link>
      </div>
      {children}
    </article>
  )
}

export const Articles = () => {
  return (
    <SectionWrapper titleClassName="mb-14" title="What Our Product Does">
      <Article
        title="Mint NFT"
        bio={[
          'Experience lightning fast NFT creation without compromising on quality.',
          'Enjoy competitive pricing and transparent fees, ensuring value for every masterpiece minted.',
          'Tailor your NFTs with ease, offering a personalized touch to your digital assets.',
        ]}
        button={{ link: '/mint', text: 'Mint NFT' }}
      >
        <div className="border-2 border-primary rounded-lg">
          <Image
            src={mintNFT}
            quality={100}
            placeholder="blur"
            width={440}
            height={440}
            alt="mint-picture"
            className="relative left-2 bottom-2 rounded-lg"
          />
        </div>
      </Article>

      <Article
        title="Bridge"
        revert
        bio={[
          'Seamlessly bridge assets across different blockchain networks, expanding your reach and opportunities.',
          'Benefit from robust security protocols, ensuring the safe passage of your assets during the bridging process.',
          'Receive dedicated assistance in navigating the complexities of asset bridging, making your journey hassle-free.',
        ]}
        button={{ link: '/bridge', text: 'Bridge' }}
      >
        <div className="relative lg:mt-32 mt-0">
          <div className="border-2 border-primary rounded-lg">
            <Image
              src={bridge}
              placeholder="blur"
              width={500}
              height={273}
              quality={100}
              alt="mint-picture"
              className="relative right-2 bottom-2 rounded-lg"
            />
          </div>
          <Image
            src={bridgeNFT}
            placeholder="blur"
            width={300}
            height={300}
            alt="mint-picture"
            className="absolute -top-32 -left-16 rounded-lg scale-x-[-1] z-10 lg:block hidden"
          />
          <div className="w-56 h-56 -z-10 bg-primary blur-[150px] absolute bottom-0 right-0" />
        </div>
      </Article>

      <Article
        title="Gas Refuel"
        bio={[
          'Refuel your cryptocurrency instantly, eliminating delays in your Web3 activities',
          'Choose from a range of gas options, optimizing transaction speed and cost to suit your preferences.',
          'Effortlessly manage your gas funds with our intuitive dashboard, keeping you in control.',
        ]}
        button={{ link: '/refuel', text: 'Refuel' }}
      >
        <div className="relative lg:mt-24 mt-0">
          <div className="border-2 border-primary rounded-lg">
            <Image
              src={refuelNFT}
              placeholder="blur"
              quality={100}
              width={350}
              height={350}
              alt="mint-picture"
              className="relative left-2 bottom-2 rounded-lg"
            />
          </div>
          <Image
            src={refuel}
            placeholder="blur"
            width={300}
            height={300}
            alt="mint-picture"
            className="absolute -top-32 -right-32 rounded-lg -z-10 lg:block hidden"
          />
          <div className="w-56 h-56 -z-10 bg-primary blur-[150px] absolute bottom-0 right-0" />
        </div>
      </Article>
    </SectionWrapper>
  )
}
