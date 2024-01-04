import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { useContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'viem/utils'
import { useState } from 'react'
import { MintedDialog } from './minted-dialog'
import { toast } from 'sonner'
import { arbitrumABI } from '../../_utils/abi/arbitrum'

export const MintButton = () => {
  const { address, status } = useAccount()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { openConnectModal } = useConnectModal()

  const {
    write,
    data: signData,
    isLoading: isSigning,
  } = useContractWrite({
    address: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
    abi: arbitrumABI,
    functionName: 'mint',
    chainId: 42170,
    value: parseEther('0'),
    onError(error) {
      toast('Error occurred!', {
        description: `${error.message.slice(0, 400)}${
          error.message.length > 400 ? '...' : ''
        }`,
      })
    },
  })

  const { isLoading: isWaiting } = useWaitForTransaction({
    hash: signData?.hash,
    onSuccess() {
      setIsDialogOpen(true)
    },
    onError(error) {
      toast('Error occurred!', {
        description: `${error.message.slice(0, 400)}${
          error.message.length > 400 ? '...' : ''
        }`,
      })
    },
  })

  function mintNFT() {
    write()
  }

  if (status === 'reconnecting' || status === 'connecting')
    return (
      <>
        <Button className="mb-4 w-full" loading>
          Loading...
        </Button>
      </>
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
