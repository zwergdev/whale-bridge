'use client'

import { Button } from '@/components/ui/button-new'
import { formatEther } from 'viem'

type TotalProps = {
  disabled?: boolean
  usd: number
  symbol: string
  value?: bigint[]
  children?: React.ReactNode
}

export const Total = ({
  disabled,
  usd,
  symbol,
  value,
  children,
}: TotalProps) => {
  const sum = value?.length
    ? value.reduce((acc, sm) => acc + sm, BigInt(0))
    : BigInt(0)

  const valueInEther = value ? Number(formatEther(sum)) : 0

  return (
    <div className="w-full flex items-center justify-center flex-col p-2 rounded-md gap-1 border border-ring">
      <div className="w-full flex items-center justify-between text-sm px-3 py-1">
        Fee:
        <span>
          <span>
            {valueInEther.toFixed(3)} {symbol}
          </span>{' '}
          <span>(${(valueInEther * usd).toFixed(2)})</span>
        </span>
      </div>

      <div className="w-full border-popover rounded-md border p-4 pt-2 bg-[#011e37]/30 mt-2">
        <div className="pb-4 flex w-full items-center justify-between text-sm">
          Total:
          <span>
            <span className="text-white text-xl mr-1">
              {valueInEther.toFixed(3)} {symbol}
            </span>
            <span>(${(valueInEther * usd).toFixed(2)})</span>
          </span>
        </div>

        <div className="w-full flex items-center justify-between gap-2 flex-col">
          {children}
          <Button
            type="submit"
            className="h-10 w-full text-2xl"
            disabled={disabled || valueInEther * usd <= 0}
          >
            SEND
          </Button>
        </div>
      </div>
    </div>
  )
}
