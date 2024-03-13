import { Button } from '@/components/ui/button-new'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type ChainToProps = {
  name: string
  max: number
  symbol: string
  logo: string
  selected?: boolean
  valueInEther?: string
  onMaxClick: () => void
  onChange: (value: string) => void
}

export const ChainTo = ({
  logo,
  name,
  max,
  symbol,
  selected,
  valueInEther,
  onMaxClick,
  onChange,
}: ChainToProps) => {
  const isError = valueInEther && Number(valueInEther) > max
  return (
    <div
      className={cn(
        'py-3 px-4 pr-6 border-b relative border-popover flex w-full sm:flex-row flex-col sm:items-center items-start justify-between sm:gap-0 gap-3',
        selected && 'bg-popover',
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          width={24}
          height={24}
          alt="chain"
          className="rounded-full"
        />
        <span className="text-sm">{name}</span>
      </div>

      <div className="flex items-center gap-3 relative sm:w-auto w-full">
        <div className="relative sm:w-auto w-full">
          <input
            type="number"
            value={valueInEther}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
            placeholder={`0 ${symbol}`}
            className={cn(
              'sm:w-28 w-full h-8 border-[#0d3b63]/50 bg-popover hover:bg-popover rounded-md border p-2 pr-5 placeholder:text-muted-foreground outline-none',
              isError && 'border-destructive',
              selected && 'border-ring',
            )}
          />
          {isError && (
            <div className="absolute -bottom-2.5 left-1.5 border-destructive border rounded-sm bg-popover px-1 z-50 text-destructive text-xs h-4 flex items-center">
              MAX {max} {symbol}
            </div>
          )}
        </div>

        <Button
          onClick={() => onMaxClick()}
          type="button"
          className="h-8 sm:w-32 w-full px-0 text-sm"
        >
          MAX {max} {symbol}
        </Button>
      </div>
    </div>
  )
}
