import { useQuery } from '@tanstack/react-query'
import { getRefferalsCount } from '../actions'

export const ReferalsCounter = ({ code }: { code: string }) => {
  const { data: referals, isLoading } = useQuery({
    queryKey: ['referalsCount'],
    queryFn: () => getRefferalsCount(code),
  })

  return (
    <p className="text-secondary text-sm">
      Your Referrals: {isLoading ? '...' : referals}
    </p>
  )
}
