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
  const { address, status, chainId } = useAccount()
  const { open } = useWeb3Modal()
  const { open: isOpen } = useWeb3ModalState()
  const { data: _balance } = useBalance({ address })
  const balance = Number(Number(_balance?.formatted).toFixed(5))

  const selectedChainId = chainId ?? 0

  const mintData = mint(selectedChainId)
  const { data: hash, writeContract, isPending: isSigning } = useWriteContract()

  const mintNFT = () => {
    if (balance < Number(CONTRACTS[selectedChainId].mintPrice))
      return truncatedToaster('Error occurred!', 'Insufficient balance.')

    writeContract(mintData)
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
      <div className="flex items-center gap-5 mb-5">
        <Button
          className="w-full max-w-lg "
          onClick={handleClick}
          loading={isWaiting || isSigning}
          disabled={isOpen}
        >
          {address ? 'Mint' : 'Connect wallet'}
        </Button>
      </div>

      <MintedDialog hash={hash} open={!!waitData} chainId={selectedChainId} />
    </>
  )
}
