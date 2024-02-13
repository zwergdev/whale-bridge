import { CheckDone, CheckPending } from '@/components/ui/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { SectionWrapper } from './misc'

const ROADMAP = [
  {
    title: 'Launch',
    done: true,
  },
  {
    title: '20+ Chains',
    done: true,
  },
  {
    title: 'Bridge Tokens',
    done: true,
  },
  {
    title: 'Now',
    now: true,
  },
  {
    title: 'Messenger',
    done: false,
  },
  {
    title: 'Gas Station',
    done: false,
  },
]

export const Roadmap = () => {
  return (
    <SectionWrapper
      title="Roadmap"
      description="Our plans and goals for Q1 - Q2."
    >
      <div className="pt-14 pb-44">
        <div className="flex md:items-center items-start md:gap-0 gap-7 justify-between relative md:flex-row flex-col">
          {ROADMAP.map((item, i) => (
            <RoadmapItem key={i} {...item} />
          ))}
          <Separator className="absolute bottom-3.5 left-5 -z-10 w-screen md:block hidden" />
          <Separator
            className="absolute top-0 left-3.5 -z-10 md:hidden block h-[115%]"
            orientation="vertical"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}

const RoadmapItem = ({
  title,
  done,
  now,
}: Partial<{ title: string; done: boolean; now: boolean }>) => (
  <div className="flex items-center md:flex-col flex-row-reverse justify-center gap-4">
    <h3
      className={cn(
        'text-lg font-semibold',
        now &&
          'bg-gradient-to-r text-3xl leading-none from-primary to-foreground bg-clip-text font-bold text-transparent',
      )}
    >
      {title}
    </h3>
    {now ? (
      <CheckPending bgColor="#F0B90B" centerColor="#FFFFFF" />
    ) : done ? (
      <CheckDone />
    ) : (
      <CheckPending />
    )}
  </div>
)
