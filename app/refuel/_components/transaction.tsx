'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAccount, useNetwork, useBalance } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import {
  estimateRefuelFee,
  refuel,
  getAdapter,
} from '@/app/_utils/contract-actions'
import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import { parseEther } from 'viem/utils'
import { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { RefueledDialog } from './refueled-dialog'

type TransactionProps = {
  amount: number
  balance: number
  chainTo: number
  fee: bigint
}

type Prices = {
  [key: string]: { usd: number }
}

const SYMBOL_TO_CHAIN: { [key: string]: string } = {
  ETH: 'ethereum',
  BNB: 'binancecoin',
  MATIC: 'matic-network',
}

const fetchPrices = async (): Promise<Prices> => {
  return await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,matic-network&vs_currencies=usd',
    {
      referrerPolicy: 'same-origin',
      next: { revalidate: 60 * 6 },
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const Transaction = ({
  amount,
  balance,
  chainTo,
  fee,
}: TransactionProps) => {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()
  const { data: balanceData } = useBalance({ address })
  const symbol = balanceData?.symbol
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [prices, setPrices] = useState<Prices>({
    binancecoin: {
      usd: 318.81,
    },
    ethereum: {
      usd: 2476.7,
    },
    'matic-network': {
      usd: 0.800116,
    },
  })

  useEffect(() => {
    ;(async () => {
      const prices = await fetchPrices()
      if (!prices) return console.log('no prices')
      setPrices(prices)
    })()
  }, [])

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
    if (amount > balance)
      return truncatedToaster(
        'Insufficient balance',
        `Your balance is ${balance} ${balanceData?.symbol}. Please enter amount less than or equal to your balance.`,
      )

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
  }

  return (
    <>
      {' '}
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
              <span className="font-semibold">
                {(async () => {
                  if (fee && symbol) {
                    const amount = Number(formatEther(fee)).toFixed(2)

                    return `${amount} ${symbol ?? 'XXX'} ($${(
                      prices[SYMBOL_TO_CHAIN[symbol]].usd * Number(amount)
                    ).toFixed(2)})`
                  }
                  return '0 XXX ($0.00)'
                })()}
              </span>
            </div>

            <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary md:mb-5 mb-2">
              Expected Output:
              <span className="font-semibold">
                {amount ?? 0} {symbol ?? 'XXX'} ($
                {symbol && amount && prices && Object.keys(prices).length
                  ? (prices[SYMBOL_TO_CHAIN[symbol]].usd * amount).toFixed(2)
                  : '0.00'}
                )
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              className="w-full text-base py-2.5"
              onClick={onConfirm}
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
