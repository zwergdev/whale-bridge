import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui'
import { Info } from '@/components/ui/icons'

export const InfoHover = ({
  desc,
  align = 'end',
}: { desc: string; align?: 'start' | 'end' }) => {
  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger className="cursor-help">
        <Info size={12} className="ml-3 opacity-75" />
      </HoverCardTrigger>
      <HoverCardContent align={align}>{desc}</HoverCardContent>
    </HoverCard>
  )
}
