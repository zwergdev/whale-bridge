'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAccount, useNetwork } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import {
  estimateRefuelFee,
  refuel,
  getAdapter,
} from '@/app/_utils/contract-actions'
import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import { parseEther } from 'viem/utils'
import { useState } from 'react'
import { RefueledDialog } from './refueled-dialog'

type TransactionProps = {
  amount: number
  balance: number
  chainTo: number
  fee?: string
  expectedOutput?: string
}

export const Transaction = ({
  amount,
  balance,
  chainTo,
  fee,
  expectedOutput,
}: TransactionProps) => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    data: refueledData,
    writeAsync,
    isLoading,
  } = refuel(chain?.unsupported ? 0 : chain?.id ?? 0)

  const { error: feeError, refetch } = estimateRefuelFee(
    chainTo,
    chain?.unsupported ? 0 : chain?.id ?? 0,
    address!,
    amount,
  )

  async function onConfirm() {
    const { data: fee }: any = await refetch()

    if (!fee) return truncatedToaster('Error occurred!', feeError?.message!)

    await writeAsync({
      value: fee[0],
      args: [
        chainTo,
        address,
        getAdapter(parseEther(amount.toString()), address!),
      ],
    })

    setIsDialogOpen(true)
  }

  return (
    <>
      <Dialog>
        {address ? (
          <DialogTrigger asChild>
            <Button
              type="button"
              className="w-full text-base py-2.5"
              disabled={!amount || !balance || isLoading || amount > balance}
            >
              Refuel
            </Button>
          </DialogTrigger>
        ) : (
          <Button
            type="button"
            className="w-full text-base py-2.5"
            onClick={openConnectModal}
            disabled={connectModalOpen}
          >
            Connect Wallet
          </Button>
        )}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Summary</DialogTitle>
          </DialogHeader>

          <div>
            <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5">
              Estimated Transfer Time:
              <span className="font-semibold">~5 mins</span>
            </div>

            <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary">
              Refuel cost:
              <span className="font-semibold">{fee}</span>
            </div>

            <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary md:mb-5 mb-2">
              Expected Output:
              <span className="font-semibold">{expectedOutput}</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              className="w-full text-base py-2.5"
              onClick={onConfirm}
              disabled={fee === '...' || expectedOutput === '...'}
              loading={isLoading}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <RefueledDialog
        hash={refueledData?.hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={chain?.id ?? 0}
        chainTo={chainTo}
      />
    </>
  )
}
