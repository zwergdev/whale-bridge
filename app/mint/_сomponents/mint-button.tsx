'use client'

import { Button } from '@/components/ui/button-new'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import {
  useAccount,
  useBalance,
  useNetwork,
  useWaitForTransaction,
} from 'wagmi'
import { CONTRACTS, mint } from '../../_utils/contract-actions'
import { truncatedToaster } from '../../_utils/truncatedToaster'
import { MintedDialog } from './minted-dialog'

export const MintButton = () => {
  const { address, status } = useAccount()
  const { chain } = useNetwork()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { openConnectModal, connectModalOpen } = useConnectModal()
  const { data: _balance } = useBalance({ address })
  const balance = Number(Number(_balance?.formatted).toFixed(5))

  const selectedChainId = chain?.unsupported ? 0 : chain?.id ?? 0

  const { write, data: signData, isLoading: isSigning } = mint(selectedChainId)

  const mintNFT = () => {
    if (balance < Number(CONTRACTS[selectedChainId].mintPrice))
      return truncatedToaster('Error occurred!', 'Insufficient balance.')

    write()
  }

  const { isLoading: isWaiting } = useWaitForTransaction({
    hash: signData?.hash,
    confirmations: 2,
    onSuccess() {
      setIsDialogOpen(true)
    },
    onError(error) {
      truncatedToaster('Error occurred!', error?.message!)
    },
  })

  if (status === 'reconnecting' || status === 'connecting')
    return (
      <Button className="w-full" loading>
        Loading...
      </Button>
    )

  return (
    <>
      <div className="flex items-center gap-5 mb-5">
        <Button
          className="w-full max-w-lg before:scale-x-[1.01]"
          onClick={address ? mintNFT : openConnectModal}
          loading={isWaiting || isSigning}
          disabled={connectModalOpen}
        >
          {address ? 'Mint' : 'Connect wallet'}
        </Button>
      </div>

      <MintedDialog
        hash={signData?.hash}
        open={isDialogOpen}
        chainId={selectedChainId}
      />
    </>
  )
}
