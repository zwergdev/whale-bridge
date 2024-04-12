import { ButtonNew } from '@/components/ui'
import { CheckPending } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
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
          <ButtonNew className="w-38 md:mt-2 mt-0">{button.text}</ButtonNew>
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
          'Experience lightning-fast NFT creation on 25+ networks.',
          'Enjoy competitive pricing and transparent fees.',
          'Send your NFT to one of 25 networks using Whale Bridge.',
        ]}
        button={{ link: '/mint', text: 'Mint NFT' }}
      >
        <div className="border-basic rounded-lg">
          <Image
            src="/nft/nft-l0.webp"
            quality={100}
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
          'Seamlessly bridge NFTs across 25+ networks, expanding your reach and opportunities.',
          'Benefit from robust LayerZero Network, ensuring the safe passage of your assets during the bridging process.',
          'Easily select a specific NFT from your wallet to bridge without manual entry.',
        ]}
        button={{ link: '/bridge', text: 'Bridge' }}
      >
        <div className="relative lg:mt-32 mt-0">
          <div className="border-basic rounded-lg">
            <Image
              src="/general/bridge-menu.webp"
              width={500}
              height={273}
              quality={100}
              alt="mint-picture"
              className="relative right-1.5 bottom-1.5 rounded-lg"
            />
          </div>
          <Image
            src="/nft/nft-bridge.webp"
            width={300}
            height={300}
            alt="mint-picture"
            className="absolute -top-32 -left-16 rounded-lg scale-x-[-1] z-10 lg:block hidden"
          />
          <div className="w-56 h-56 container-absolute blur-[250px] bottom-0 right-0" />
        </div>
      </Article>

      <Article
        title="Gas Refuel"
        bio={[
          'Conveniently send a small amount for transaction commission to one of 25 networks.',
          'Use Gas Refuel for easy access to all supported networks.',
          'Top up other networks with zero commission and guaranteed success.',
        ]}
        button={{ link: '/refuel', text: 'Refuel' }}
      >
        <div className="relative lg:mt-24 mt-0">
          <div className="border-basic rounded-lg">
            <Image
              src="/nft/nft-refuel.webp"
              quality={100}
              width={350}
              height={350}
              alt="mint-picture"
              className="relative left-2 bottom-2 rounded-lg"
            />
          </div>
          <Image
            src="/general/refuel-menu.webp"
            width={320}
            height={320}
            alt="mint-picture"
            className="absolute -top-32 -right-32 rounded-lg -z-10 lg:block hidden"
          />
          <div className="w-56 h-56 container-absolute blur-[200px] bottom-0 right-0" />
        </div>
      </Article>
      <div className="mb-32 h-px" />
    </SectionWrapper>
  )
}
