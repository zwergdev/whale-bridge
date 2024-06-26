'use client'

import { Progress } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useGetNextMintId } from '../_hooks/actions'

const calculateMinted = (next: number, chainId: number) => {
  switch (chainId) {
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
    case 122:
      return next - 12000000
    case 1088:
      return next - 12500000
    case 148:
      return next - 13000000
    default:
      return 0
  }
}

export const TotalMinted = () => {
  const [minted, setMinted] = useState(0)
  const { chain } = useAccount()

  const { refetch } = useGetNextMintId(chain?.id ?? 0)

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    ;(async () => {
      setMinted(0)
      const { data: next }: any = await refetch()
      if (!next) return

      const minted = calculateMinted(Number(next), chain?.id ?? 0)

      setMinted(minted)
    })()
  }, [chain])

  const percentMinted = Number(((minted / 499999) * 100).toFixed(2))

  return (
    <div
      className={cn(
        'w-full max-w-lg transition-opacity duration-300 opacity-100',
        minted <= 0 && 'opacity-0',
      )}
    >
      <Progress className="mb-2.5" value={percentMinted} />

      <div className="flex-center-between w-full text-base font-medium">
        <p>Total Minted</p>
        <p>
          {percentMinted}% ({minted}/{499999})
        </p>
      </div>
    </div>
  )
}
