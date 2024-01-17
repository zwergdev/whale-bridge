'use client'

import { useEffect, useState } from 'react'
import { formatEther } from 'viem'

type TransactionSummaryProps = {
  time: string
  refuelAmount: bigint | unknown
  amount?: number
  symbol?: string
}

type Prices = {
  [key: string]: { usd: number }
}

const fetchPrices = async (): Promise<Prices> => {
  return await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,matic-network&vs_currencies=usd',
    {
      cache: 'no-cache',
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

const SYMBOL_TO_CHAIN: { [key: string]: string } = {
  ETH: 'ethereum',
  BNB: 'binancecoin',
  MATIC: 'matic-network',
}

export const TransactionSummary = ({
  time,
  refuelAmount,
  amount,
  symbol,
}: TransactionSummaryProps) => {
  const [prices, setPrices] = useState<Prices>({
    // binancecoin: {
    //   usd: 315.64,
    // },
    // ethereum: {
    //   usd: 2596.7,
    // },
    // 'matic-network': {
    //   usd: 0.850116,
    // },
  })

  useEffect(() => {
    ;(async () => {
      const prices = await fetchPrices()
      setPrices(prices)
    })()
  }, [])

  return (
    <article className="bg-popover rounded-md md:pt-5 pt-3 px-4 max-w-xl mx-auto mb-11">
      <h3 className="font-semibold md:text-lg text-base md:mb-4 mb-2">
        Transaction Summary
      </h3>
      <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary">
        Estimated Transfer Time:
        <span className="font-semibold">~{time} mins</span>
      </div>
      <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary">
        Refuel cost:
        <span className="font-semibold">
          {(() => {
            const fee = refuelAmount as bigint[]
            if (
              Array.isArray(fee) &&
              symbol &&
              prices &&
              Object.keys(prices).length
            ) {
              const amount = Number(formatEther(fee[0])).toFixed(2)

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
    </article>
  )
}
