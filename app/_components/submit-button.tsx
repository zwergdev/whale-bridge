'use client'

import { Button } from '@/components/ui/button'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'


type SubmitButtonProps = {
  disabled: boolean
  loading?: boolean
  children: React.ReactNode
}

export const SubmitButton = ({
  disabled,
  children,
  loading,
}: SubmitButtonProps) => {
  const { address, status } = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()

  if (status === 'reconnecting' || status === 'connecting')
    return (
      <Button type="button" className="w-full text-base py-2.5" loading>
        Loading...
      </Button>
    )

  if (!address)
    return (
      <Button
        type="button"
        className="w-full text-base py-2.5"
        onClick={openConnectModal}
        disabled={connectModalOpen}
      >
        Connect Wallet
      </Button>
    )

  return (
    <Button
      type="submit"
      disabled={disabled}
      loading={loading}
      className="w-full text-base py-2.5"
    >
      {children}
    </Button>
  )
}
