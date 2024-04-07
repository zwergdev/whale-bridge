'use client'
import { useGetAccount } from '@/app/_hooks/use-get-account'
import { ButtonNew } from '@/components/ui'
import { useConnectModal } from '@rainbow-me/rainbowkit'

export const MintButton = () => {
  const { address, status } = useGetAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()

  const handleClick = () => {
    if (address) return console.log('working')
    openConnectModal?.()
  }

  if (status === 'reconnecting' || status === 'connecting')
    return (
      <ButtonNew className="w-full mb-5" loading>
        Loading...
      </ButtonNew>
    )

  return (
    <>
      <ButtonNew
        className="w-full mb-5"
        onClick={handleClick}
        disabled={connectModalOpen}
      >
        {address ? 'Mint' : 'Connect wallet'}
      </ButtonNew>
    </>
  )
}
