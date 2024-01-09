'use client'

import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { useAccount, useNetwork, useWaitForTransaction } from 'wagmi'
import { useState } from 'react'
import { MintedDialog } from './minted-dialog'
import { truncatedToaster } from '../../_utils/truncatedToaster'
import { mint } from '../../_utils/contract-actions'

export const MintButton = () => {
  const { address, status } = useAccount()
  const { chain } = useNetwork()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { openConnectModal,connectModalOpen } = useConnectModal()

  const { write, data: signData, isLoading: isSigning } = mint(chain?.id ?? 0)
  const mintNFT = () => write()

  const { isLoading: isWaiting } = useWaitForTransaction({
    hash: signData?.hash,
    onSuccess() {
      setIsDialogOpen(true)
    },
    onError(error) {
      truncatedToaster('Error occurred!', error?.message!)
    },
  })

  if (status === 'reconnecting' || status === 'connecting')
    return (
      <Button className="w-48" variant="secondary" loading>
        Loading...
      </Button>
    )

  return (
    <>
      <Button
        className="w-48"
        variant="secondary"
        onClick={address ? mintNFT : openConnectModal}
        loading={isWaiting || isSigning}
        disabled={connectModalOpen}
      >
        {address ? 'Mint' : 'Connect wallet'}
      </Button>

      <MintedDialog
        hash={signData?.hash}
        open={isDialogOpen}
        chainId={chain?.id ?? 0}
      />
    </>
  )
}
