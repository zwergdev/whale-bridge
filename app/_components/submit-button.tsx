'use client'

import { ButtonNew } from '@/components/ui'
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
      <ButtonNew type="button" className="w-full py-2.5" loading>
        Loading...
      </ButtonNew>
    )

  if (!address)
    return (
      <ButtonNew
        type="button"
        className="w-full py-2.5 hover:scale-[1.04]"
        onClick={() => openConnectModal?.()}
        disabled={connectModalOpen}
      >
        Connect Wallet
      </ButtonNew>
    )

  return (
    <ButtonNew
      type="submit"
      disabled={disabled}
      loading={loading}
      className="w-full py-2.5 hover:scale-[1.04]"
    >
      {children}
    </ButtonNew>
  )
}
