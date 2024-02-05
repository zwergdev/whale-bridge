'use client'

import { useAccount } from 'wagmi'
import { CreateCode } from './_components/create-code'
import { NoWalletPage } from './_components/no-wallet-page'
import { RedeemCode } from './_components/redeem-code'

export default function ProfilePage() {
  const { address } = useAccount()

  if (!address) return <NoWalletPage />

  return (
    <section className="flex max-w-screen-xl mx-auto w-full flex-col items-center justify-center gap-5 pt-16">
      <h6>Address: {address}</h6>

      <CreateCode />

      <RedeemCode />
    </section>
  )
}
