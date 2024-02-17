'use client'

import { useWriteContract } from '@/app/_hooks'
import { MINT_CONTRACTS } from '@/app/mint/_contracts/mint-contracts'
import { Button } from '@/components/ui/button-new'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useWaitForTransactionReceipt } from 'wagmi'
import { truncatedToaster } from '../../_utils/truncatedToaster'
import { mint } from '../_contracts/mint-contracts'
import { MintedDialog } from './minted-dialog'

export const MintButton = () => {
  const { address, status, chain } = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()
  const { data: balance } = useBalance({ address })

  const selectedChainId = chain?.id ?? 0

  const { data: hash, writeContract, isPending } = useWriteContract()

  const mintNFT = () => {
    if (Number(balance?.formatted) < MINT_CONTRACTS[selectedChainId].price)
      return truncatedToaster('Error occurred!', 'Insufficient balance.')

    writeContract(mint(selectedChainId))
  }

  const handleClick = () => {
    if (address) return mintNFT()
    openConnectModal?.()
  }

  const { isLoading, data: waitData } = useWaitForTransactionReceipt({
    hash,
    confirmations: 2,
  })

  if (status === 'reconnecting' || status === 'connecting')
    return (
      <Button className="w-full mb-5" loading>
        Loading...
      </Button>
    )

  return (
    <>
      <Button
        className="w-full mb-5"
        onClick={handleClick}
        loading={isLoading || isPending}
        disabled={connectModalOpen}
      >
        {address ? 'Mint' : 'Connect wallet'}
      </Button>

      <MintedDialog hash={hash} open={!!waitData} chainId={selectedChainId} />
    </>
  )
}
