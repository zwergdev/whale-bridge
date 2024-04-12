'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader } from '@/components/ui/icons'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import {
  CreateCode,
  NoWalletPage,
  OwnedCode,
  RedeemCode,
  RedeemedCode,
} from './_components'
import { getUser } from './actions'

export default function ProfilePage() {
  const queryClient = useQueryClient()
  const { address, connector } = useAccount()

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['userData'] })
  }, [connector, queryClient])

  const { data: user, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUser(address!),
    enabled: !!address,
  })

  if (!address) return <NoWalletPage />

  if (isLoading)
    return (
      <div className="flex-row-center h-[calc(100vh-160px)] w-screen">
        <Loader className="h-8 w-8 animate-spin-slow" />
      </div>
    )

  return (
    <section className="flex-col-center max-w-screen-xl mx-auto w-full pt-40 gap-5 min-h-[calc(100vh-160px)]">
      <h6 className="font-medium text-xl text-muted-foreground mb-6 cursor-not-allowed">
        Leaderboard
      </h6>

      <h6 className="py-2 px-6 rounded-xl sm:text-sm text-xs bg-popover">
        <span className="sm:inline-flex hidden">Address:</span> {address}
      </h6>

      {user?.ownedCode ? (
        <OwnedCode code={user.ownedCode.code} />
      ) : (
        <CreateCode />
      )}

      {user?.usedCode ? (
        <RedeemedCode code={user.usedCode.codeValue} />
      ) : (
        <RedeemCode />
      )}
    </section>
  )
}
