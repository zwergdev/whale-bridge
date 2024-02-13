import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Info } from 'lucide-react'

export const InfoHover = ({ desc }: { desc: string }) => {
  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger className='cursor-help'>
        <Info size={12} className="ml-3 opacity-75" />
      </HoverCardTrigger>
      <HoverCardContent>{desc}</HoverCardContent>
    </HoverCard>
  )
}
