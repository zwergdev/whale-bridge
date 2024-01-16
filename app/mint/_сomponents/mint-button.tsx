'use client'

import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import {
  useAccount,
  useNetwork,
  useWaitForTransaction,
  useSwitchNetwork,
} from 'wagmi'
import { useState } from 'react'
import { MintedDialog } from './minted-dialog'
import { truncatedToaster } from '../../_utils/truncatedToaster'
import { mint } from '../../_utils/contract-actions'
import { CHAINS } from '@/app/_utils/chains'
import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const MintButton = () => {
  const { address, status } = useAccount()
  const { chain } = useNetwork()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { openConnectModal, connectModalOpen } = useConnectModal()
  const { switchNetwork } = useSwitchNetwork()

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
      <div className="flex items-center gap-5">
        <Button
          className="w-48"
          variant="secondary"
          onClick={address ? mintNFT : openConnectModal}
          loading={isWaiting || isSigning}
          disabled={connectModalOpen}
        >
          {address ? 'Mint' : 'Connect wallet'}
        </Button>
        {CHAINS.find(({ chainId }) => chainId === chain?.id) ? (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger>
              <Button
                variant="secondary"
                className="p-2 before:scale-x-[1.03] before:scale-y-[1.04]"
              >
                <Image
                  src={
                    CHAINS.find(({ chainId }) => chainId === chain?.id)?.image!
                  }
                  alt="chain-image"
                  width={30}
                  height={30}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex gap-2 w-auto p-2 border-primary">
              {CHAINS.map(({ chainId, image }) => (
                <button
                  type="button"
                  onClick={() => {
                    switchNetwork?.(chainId)
                    setIsPopoverOpen(false)
                  }}
                  className="hover:bg-paper p-2 rounded-md transition-colors duration-300"
                >
                  <Image src={image} width={30} height={30} alt="chain-image" />
                </button>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          ''
        )}
      </div>

      <MintedDialog
        hash={signData?.hash}
        open={isDialogOpen}
        chainId={chain?.id ?? 0}
      />
    </>
  )
}
