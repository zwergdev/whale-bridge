import { CHAINS } from '@/app/_utils/chains'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

export const GasAmount = ({
  selectedChains,
  setValue,
}: {
  selectedChains: {
    chain: string
    chainId: number
    amount?: number | undefined
  }[]
  setValue: any
}) => {
  const MAX_AMOUNT_GAS = 100

  function selectChainHandle(value: number, label: string) {
    if (!selectedChains.find(({ chainId }) => chainId === value)) {
      return setValue('selectedChains', [
        ...selectedChains,
        {
          chainId: value,
          chain: label,
        },
      ])
    }
    if (selectedChains.find(({ chainId }) => chainId === value)) {
      return setValue('selectedChains', [
        ...selectedChains.filter(({ chainId }) => chainId !== value),
      ])
    }
  }

  function maxAmountHandle(value: number, label: string) {
    if (!selectedChains.find(({ chainId }) => chainId === value)) {
      return setValue('selectedChains', [
        ...selectedChains,
        {
          chainId: value,
          chain: label,
          amount: MAX_AMOUNT_GAS,
        },
      ])
    }
    return setValue(
      'selectedChains',
      selectedChains.map((obj) =>
        obj.chainId === value
          ? {
              ...obj,
              amount: MAX_AMOUNT_GAS,
            }
          : obj,
      ),
    )
  }

  return (
    <FormItem>
      <ScrollArea className="h-96">
        <div className="w-full h-auto flex flex-col gap-4 px-5 pt-3">
          {CHAINS.map(({ label, image, value }, index) => (
            <>
              <div
                className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center max-sm:gap-3"
                key={index}
              >
                <div className="w-max flex items-center">
                  <Checkbox
                    checked={
                      !!selectedChains.find(({ chainId }) => chainId === value)
                    }
                    onCheckedChange={() => selectChainHandle(value, label)}
                  />
                  <Image
                    src={image}
                    width={35}
                    height={35}
                    alt="chain-image"
                    className="rounded-full mx-2"
                  />
                  <span className="text-lg">{label}</span>
                </div>
                <div className="flex max-sm:w-full max-sm:justify-between items-center">
                  <Input
                    className="py-5 sm:h-3 sm:max-w-36 mr-3"
                    placeholder="Amount"
                    type="number"
                    value={
                      selectedChains.find(({ chainId }) => chainId === value)
                        ?.amount ?? ''
                    }
                    onChange={(e) => {
                      setValue(
                        'selectedChains',
                        selectedChains.map((obj) =>
                          obj.chainId === value
                            ? {
                                ...obj,
                                amount: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              }
                            : obj,
                        ),
                      )
                    }}
                  />
                  <Button
                    size="sm"
                    className="h-4 py-5"
                    onClick={() => maxAmountHandle(value, label)}
                  >
                    MAX
                  </Button>
                </div>
              </div>
              <Separator />
            </>
          ))}
        </div>
      </ScrollArea>
    </FormItem>
  )
}
