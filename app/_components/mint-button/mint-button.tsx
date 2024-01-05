import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { useAccount, useWaitForTransaction } from 'wagmi'
import { useState } from 'react'
import { MintedDialog } from './minted-dialog'
import { truncatedToaster } from '../../_utils/truncatedToaster'
import { mintArbitrum } from '../../_utils/contract-actions/arbitrum'

export const MintButton = () => {
  const { address, status } = useAccount()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { openConnectModal } = useConnectModal()

  const { write, data: signData, isLoading: isSigning } = mintArbitrum()
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
      <Button className="mb-4 w-full" loading>
        Loading...
      </Button>
    )

  return (
    <>
      <Button
        className="mb-4 w-full"
        onClick={address ? mintNFT : openConnectModal}
        loading={isWaiting || isSigning}
      >
        {address ? 'Mint' : 'Connect wallet'}
      </Button>

      <MintedDialog
        hash={signData?.hash}
        open={isDialogOpen}
        onClick={() => setIsDialogOpen(false)}
      />
    </>
  )
}
