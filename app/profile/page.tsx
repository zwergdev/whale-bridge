'use client'

import { RedeemedCode } from '@/app/profile/_components/redeemed-code'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useAccount } from 'wagmi'
import { CreateCode } from './_components/create-code'
import { NoWalletPage } from './_components/no-wallet-page'
import { OwnedCode } from './_components/owned-code'
import { RedeemCode } from './_components/redeem-code'
import { getUser } from './actions'

export default function ProfilePage() {
  const { address } = useAccount()

  const { data: user, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUser(address!),
    enabled: !!address,
  })

  if (!address) return <NoWalletPage />

  if (isLoading) return <Loader className="mb-4 h-8 w-8 animate-spin-slow" />

  return (
    <section className="flex max-w-screen-xl mx-auto w-full flex-col items-center justify-center gap-5 pt-16">
      <h6 className="py-2 px-6 rounded-xl text-sm bg-popover">
        Address: {address}
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
