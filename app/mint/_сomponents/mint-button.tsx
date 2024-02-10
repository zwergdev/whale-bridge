'use client'

import { Button } from '@/components/ui/button-new'
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { CONTRACTS, mint } from '../../_utils/contract-actions'
import { truncatedToaster } from '../../_utils/truncatedToaster'
import { MintedDialog } from './minted-dialog'

export const MintButton = () => {
  const { address, status, chain } = useAccount()
  const { open } = useWeb3Modal()
  const { open: isOpen } = useWeb3ModalState()
  const { data: _balance } = useBalance({ address })
  const balance = Number(Number(_balance?.formatted).toFixed(5))

  const selectedChainId = chain?.id ?? 0

  const {
    data: hash,
    writeContract,
    isPending: isSigning,
    error,
  } = useWriteContract()

  const mintNFT = () => {
    if (
      error?.message.includes('insufficient balance') ||
      error?.message.includes('The total cost') ||
      balance < Number(CONTRACTS[selectedChainId].mintPrice)
    )
      return truncatedToaster('Error occurred!', 'Insufficient balance.')

    writeContract(mint(selectedChainId))
  }

  const handleClick = () => {
    if (address) return mintNFT()
    open({ view: 'Connect' })
  }

  const { isLoading: isWaiting, data: waitData } = useWaitForTransactionReceipt(
    { hash, confirmations: 2 },
  )

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
        loading={isWaiting || isSigning}
        disabled={isOpen}
      >
        {address ? 'Mint' : 'Connect wallet'}
      </Button>

      <MintedDialog hash={hash} open={!!waitData} chainId={selectedChainId} />
    </>
  )
}
