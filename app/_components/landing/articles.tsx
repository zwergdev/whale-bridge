import { Button } from '@/components/ui/button-new'
import { CheckPending } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import bridge from '../../../public/general/bridge-menu.webp'
import refuel from '../../../public/general/refuel-menu.webp'
import bridgeNFT from '../../../public/nft/nft-bridge.webp'
import l0NFT from '../../../public/nft/nft-l0.webp'
import refuelNFT from '../../../public/nft/nft-refuel.webp'
import { SectionWrapper } from './misc'

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
        'flex md:items-start items-center flex-col justify-center gap-10 mb-28 last-of-type:mb-4',
        revert ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      <div className="flex flex-col">
        <h3 className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent md:text-4xl text-2xl uppercase font-bold tracking-wide mb-9">
          {title}
        </h3>
        {bio.map((text, idx) => (
          <p
            key={idx}
            className="flex items-start gap-5 md:text-xl text-base sm:text-lg font-medium mb-7 max-w-[500px]"
          >
            <CheckPending
              bgColor="#09bffb"
              centerColor="#FFFFFF"
              className="min-w-5 grow min-h-5 top-0.5"
            />
            {text}
          </p>
        ))}

        <Link href={button.link}>
          <Button className="w-38 md:mt-2 mt-0">{button.text}</Button>
        </Link>
      </div>
      {children}
    </article>
  )
}

export const Articles = () => {
  return (
    <SectionWrapper
      className="mt-28"
      title="What Our Product Does"
      description="Explore the features of our platform and how it can benefit you."
    >
      <div className="mb-20 h-px" />
      <Article
        title="Mint NFT"
        bio={[
          'Experience lightning fast NFT creation without compromising on quality.',
          'Enjoy competitive pricing and transparent fees, ensuring value for every masterpiece minted.',
          'Tailor your NFTs with ease, offering a personalized touch to your digital assets.',
        ]}
        button={{ link: '/mint', text: 'Mint NFT' }}
      >
        <div className="border border-primary rounded-lg">
          <Image
            src={l0NFT}
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
          <div className="border border-primary rounded-lg">
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
          <div className="w-56 h-56 -z-10 bg-primary blur-[250px] absolute bottom-0 right-0" />
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
          <div className="border border-primary rounded-lg">
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
          <div className="w-56 h-56 -z-10 bg-primary blur-[200px] absolute bottom-0 right-0" />
        </div>
      </Article>
      <div className="mb-32 h-px" />
    </SectionWrapper>
  )
}
