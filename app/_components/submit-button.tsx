'use client'

import { Button } from '@/components/ui/button'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useSwitchNetwork, useNetwork } from 'wagmi'
import { CHAINS } from '../_utils/chains'

type SubmitButtonProps = {
  chainFrom: number
  disabled: boolean
  children: React.ReactNode
}

export const SubmitButton = ({
  disabled,
  chainFrom,
  children,
}: SubmitButtonProps) => {
  const { address, status } = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

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

  if (CHAINS.find(({ value }) => value === chainFrom)?.chainId !== chain?.id)
    return (
      <Button
        className="w-full text-base py-2.5"
        type="button"
        onClick={() =>
          switchNetwork?.(
            CHAINS.find(({ value }) => value === chainFrom)?.chainId,
          )
        }
      >
        Switch to {CHAINS.find(({ value }) => value === chainFrom)?.label}
      </Button>
    )

  return (
    <Button
      type="submit"
      disabled={disabled}
      className="w-full text-base py-2.5"
    >
      {children}
    </Button>
  )
}
