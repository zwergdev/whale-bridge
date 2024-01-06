import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

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
        <h3 className="text-[#07DEFB] text-4xl font-semibold mb-10">{title}</h3>
        {bio.map((text, idx) => (
          <p
            key={idx}
            className="before:content-[''] before:w-full before:max-w-5 before:h-5 before:rounded-full before:bg-[#30DDF4] before:block before:relative before:top-1.5 before:drop-shadow-[0_0_4px_#30DDF4] flex items-start gap-5 text-2xl font-medium mb-5 max-w-[500px]"
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

const ARTICLES = [
  {
    title: 'Mint NFT',
    bio: [
      'Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus vel molestie non dictum.',
      'Elit. Hac ornare lorem mattis lorem effid.',
    ],
    button: { link: '/mint', text: 'Mint NFT' },
    image: {
      src: '/zwerg.jpg',
      width: 300,
      height: 300,
      className: 'w-[300px] h-[300px] rounded-md',
    },
  },
  {
    title: 'Bridge',
    revert: true,
    bio: [
      'Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus vel molestie non dictum.',
      'Elit. Hac ornare lorem mattis lorem effid.',
      'Elit. Hac ornare lorem mattis lorem effid.',
    ],
    button: { link: '/mint', text: 'Bridge' },
    image: {
      src: '/zwerg.jpg',
      width: 300,
      height: 300,
      className: 'w-[300px] h-[300px] rounded-md',
    },
  },
  {
    title: 'Gas Refuel',
    bio: [
      'Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus vel molestie non dictum.',
      'Elit. Hac ornare lorem mattis lorem effid.',
    ],
    button: { link: '/refuel', text: 'Refuel' },
    image: {
      src: '/zwerg.jpg',
      width: 300,
      height: 300,
      className: 'w-[300px] h-[300px] rounded-md',
    },
  },
]

export const Articles = () => {
  return (
    <section className="max-w-screen-xl mx-auto">
      <h2 className="text-4xl text-foreground text-center font-semibold mb-14">
        What Our Product Does
      </h2>

      {ARTICLES.map(({ image, ...rest }) => (
        <Article {...rest}>
          <Image {...image} alt="preview-picture" />
        </Article>
      ))}
    </section>
  )
}
