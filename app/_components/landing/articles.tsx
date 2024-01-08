import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { SectionWrapper } from './misc'
import { Repeat2 } from 'lucide-react'

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
        'flex items-start justify-center gap-10 mb-20 last:mb-12',
        revert ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-primary text-4xl font-semibold mb-10">{title}</h3>
        {bio.map((text, idx) => (
          <p
            key={idx}
            className="before:content-[''] before:w-full before:max-w-5 before:h-5 before:rounded-full before:bg-primary before:block before:relative before:top-1.5 before:drop-shadow-[0_0_4px_#30DDF4] flex items-start gap-5 text-2xl font-medium mb-5 max-w-[500px]"
          >
            {text}
          </p>
        ))}
        <Button className="w-32 mt-10" variant="secondary">
          <Link href={button.link}>{button.text}</Link>
        </Button>
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
          'Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus vel molestie non dictum.',
          'Elit. Hac ornare lorem mattis lorem effid.',
        ]}
        button={{ link: '/mint', text: 'Mint NFT' }}
      >
        <div className="relative mt-24">
          <div className="border-2 border-primary rounded-lg">
            <Image
              src="/mint-nft.webp"
              width={350}
              height={350}
              alt="mint-picture"
              className="relative left-2 bottom-2 rounded-lg"
            />
          </div>
          <Image
            src="/bridge-nft.webp"
            width={300}
            height={300}
            alt="mint-picture"
            className="absolute -top-32 -right-32 rounded-lg scale-x-[-1] -z-10"
          />
          <div className="w-56 h-56 -z-10 bg-primary blur-[150px] absolute bottom-0 right-0" />
        </div>
      </Article>

      <Article
        title="Bridge"
        revert
        bio={[
          'Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus vel molestie non dictum.',
          'Elit. Hac ornare lorem mattis lorem effid.',
          'Elit. Hac ornare lorem mattis lorem effid.',
        ]}
        button={{ link: '/bridge', text: 'Bridge' }}
      >
        <div className="border-primary rounded-lg border-2 relative">
          <Image
            src="/bridge.webp"
            quality={100}
            width={600}
            height={330}
            alt="bridge-picture"
            className="relative left-2 top-2 rounded-lg "
          />
          <Repeat2
            className="absolute right-3 -bottom-16 w-32 h-auto"
            strokeWidth={1.5}
          />
          <div className="w-56 h-56 -z-10 bg-primary blur-[150px] absolute -bottom-10 opacity-50 left-0" />
        </div>
      </Article>

      <Article
        title="Gas Refuel"
        bio={[
          'Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus vel molestie non dictum.',
          'Elit. Hac ornare lorem mattis lorem effid.',
        ]}
        button={{ link: '/refuel', text: 'Refuel' }}
      >
        <div className="border-primary rounded-lg border-2 relative">
          <Image
            src="/refuel.webp"
            quality={100}
            width={480}
            height={460}
            alt="refuel-picture"
            className="relative right-3 bottom-3 rounded-lg "
          />
          <div className="w-64 h-64 -z-10 bg-primary blur-[150px] absolute -bottom-10 opacity-50 right-0" />
        </div>
      </Article>
    </SectionWrapper>
  )
}
