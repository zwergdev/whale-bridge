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
    title: '15+ Chains',
    done: true,
  },
  {
    title: 'Now',
    now: true,
  },
  {
    title: 'Bridge Tokens',
    done: false,
  },
  {
    title: 'Swap',
    done: false,
  },
  {
    title: 'Messenger',
    done: false,
  },
]

export const Roadmap = () => {
  return (
    <SectionWrapper
      title="Roadmap"
      description="Our plans and goals for the future."
    >
      <div className="pt-14 pb-44">
        <div className="flex items-center justify-between relative">
          {ROADMAP.map((item, i) => (
            <RoadmapItem key={i} {...item} />
          ))}
          <Separator className="absolute bottom-3.5 left-5 -z-10 w-screen" />
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
  <div className="flex items-center flex-col justify-center gap-4">
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
