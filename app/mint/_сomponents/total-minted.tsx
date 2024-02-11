'use client'

import { getNextMintId } from '@/app/_utils/contract-actions'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'

export const TotalMinted = () => {
  const [next, setNext] = useState(0)
  const { chain } = useAccount()

  const selectedChainId = chain?.id ?? 0

  const readData = getNextMintId(selectedChainId)
  const { refetch: refetchNext } = useReadContract(readData)

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    ;(async () => {
      const { data: next }: any = await refetchNext()
      if (next) setNext(Number(next) - 1)
    })()
  }, [chain])

  const newNext = () => {
    switch (chain?.id) {
      case 137:
        return next
      case 42170:
        return next - 500000
      case 56:
        return next - 1000000
      case 42161:
        return next - 1500000
      case 534352:
        return next - 2000000
      case 324:
        return next - 2500000
      case 10:
        return next - 3000000
      case 8453:
        return next - 3500000
      case 59144:
        return next - 4000000
      case 1284:
        return next - 4500000
      case 43114:
        return next - 5000000
      case 250:
        return next - 5500000
      case 42220:
        return next - 6000000
      case 100:
        return next - 6500000
      case 1101:
        return next - 7000000
      case 82:
        return next - 7500000
      case 1285:
        return next - 8000000
      case 1666600000:
        return next - 8500000
      case 204:
        return next - 9000000
      case 2222:
        return next - 9500000
      case 7777777:
        return next - 10000000
      case 8217:
        return next - 10500000
      case 5000:
        return next - 11000000
      case 1116:
        return next - 11500000
      default:
        return 0
    }
  }

  const percentMinted = Number(((newNext() / 499999) * 100).toFixed(2))

  return (
    <div className={cn('w-full max-w-lg', newNext() <= 0 && 'opacity-0')}>
      <Progress className="mb-2.5" value={percentMinted} />

      <div className="flex w-full justify-between items-center text-base font-medium">
        <p>Total Minted</p>
        <p>
          {percentMinted}% ({newNext()}/{499999})
        </p>
      </div>
    </div>
  )
}
