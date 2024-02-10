'use client'

import { Button } from '@/components/ui/button-new'
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
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
  const { open } = useWeb3Modal()
  const { open: isOpen } = useWeb3ModalState()

  if (status === 'reconnecting' || status === 'connecting')
    return (
      <Button type="button" className="w-full py-2.5" loading>
        Loading...
      </Button>
    )

  if (!address)
    return (
      <Button
        type="button"
        className="w-full py-2.5"
        onClick={() => open()}
        disabled={isOpen}
      >
        Connect Wallet
      </Button>
    )

  return (
    <Button
      type="submit"
      disabled={disabled}
      loading={loading}
      className="w-full py-2.5"
    >
      {children}
    </Button>
  )
}
