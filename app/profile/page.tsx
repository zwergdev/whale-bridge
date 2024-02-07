'use client'

import { RedeemedCode } from '@/app/profile/_components/redeemed-code'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { ConnectorData, useAccount } from 'wagmi'
import { CreateCode } from './_components/create-code'
import { NoWalletPage } from './_components/no-wallet-page'
import { OwnedCode } from './_components/owned-code'
import { RedeemCode } from './_components/redeem-code'
import { getUser } from './actions'

export default function ProfilePage() {
  const queryClient = useQueryClient()
  const { address, connector: activeConnector } = useAccount()

  useEffect(() => {
    const handleConnectorUpdate = ({ account }: ConnectorData) => {
      if (account) queryClient.invalidateQueries({ queryKey: ['userData'] })
    }

    if (activeConnector) activeConnector.on('change', handleConnectorUpdate)

    return () => activeConnector?.off('change', handleConnectorUpdate) as any
  }, [activeConnector, queryClient])

  const { data: user, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUser(address!),
    enabled: !!address,
  })

  if (!address) return <NoWalletPage />

  if (isLoading) return <Loader className="mb-4 h-8 w-8 animate-spin-slow" />

  return (
    <section className="flex max-w-screen-xl mx-auto w-full flex-col items-center justify-center gap-5 pt-8">
      <h6 className="font-medium text-xl text-muted-foreground mb-8 cursor-not-allowed">
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
