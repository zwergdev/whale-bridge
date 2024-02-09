'use client'

import { Button } from '@/components/ui/button-new'
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
      <Button
        type="button"
        className="w-full py-2.5 hover:scale-[1.025]"
        loading
      >
        Loading...
      </Button>
    )

  if (!address)
    return (
      <Button
        type="button"
        className="w-full py-2.5 hover:scale-[1.025]"
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
      className="w-full py-2.5 hover:scale-[1.025]"
    >
      {children}
    </Button>
  )
}
