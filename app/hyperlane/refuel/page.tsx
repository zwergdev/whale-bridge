'use client'
import { ChainPopover, RepeatButton } from '@/app/_components'
import {
  useCustomSwitchChain,
  useGetBalance,
  useGetBalanceTo,
} from '@/app/_hooks'
import { useGetAccount } from '@/app/_hooks/use-get-account'
import { RefuelForm, RefuelSchema } from '@/app/_utils'
import { BalanceIndicator } from '@/app/refuel/_components'
import { Paper, Slider, Input } from '@/components/ui'
import { CHAINS, MAX_REFUEL } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSwitchChain } from 'wagmi'

export default function HyperlaneRefuel() {
  const { status, chainId, chain } = useGetAccount()
  const { switchChain } = useSwitchChain()
  const { symbol, balanceFrom } = useGetBalance()

  const { watch, setValue } = useForm<RefuelForm>({
    resolver: zodResolver(RefuelSchema),
    defaultValues: {
      amount: 0,
      chainFrom: chainId === 0 ? 42161 : chainId,
      chainTo: chainId === 42161 ? 42170 : 56,
    },
  })
  const fields = watch()

  const balanceToChainId = CHAINS.find(({ value }) => value === fields?.chainTo)
    ?.chainId!

  const maxRefuelValue =
    fields.chainFrom === 145 && fields.chainTo === 125
      ? 1 // gnosis --> celo
      : MAX_REFUEL[balanceToChainId ?? 0]

  const { balanceTo, symbolTo } = useGetBalanceTo(balanceToChainId)

  return (
    <Paper title="REFUEL GAS">
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <span>Transfer from</span>
          <BalanceIndicator balance={balanceFrom} symbol={symbol} />
        </div>
        <ChainPopover
          selectedValue={fields.chainTo}
          // fieldValue={field.value}
          fieldValue={fields.chainTo}
          isPopoverFROM-
          onSelect={(value, chainId) => {
            setValue('chainFrom', value)
            if (chainId !== chain?.id) switchChain({ chainId })
          }}
        />
      </div>
      <RepeatButton
        onClick={() =>
          useCustomSwitchChain({
            switchChain(chainId) {
              switchChain({ chainId })
            },
            setValue: setValue,
            chainFrom: fields.chainFrom,
            chainTo: fields.chainTo,
          })
        }
      />
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between">
          <span>Transfer to</span>
          <BalanceIndicator balance={balanceTo} symbol={symbolTo} />
        </div>
        <ChainPopover
          selectedValue={fields.chainFrom}
          disabledChains={[165]}
          // fieldValue={field.value}
          fieldValue={fields.chainFrom}
          onSelect={(value) => {
            setValue('chainTo', value)
            setValue('amount', 0)
            // setFee(BigInt(0))
          }}
        />
      </div>
      <div className="relative flex items-center">
        <div className="flex items-end justify-between">
          Enter Refuel Amount
          <button
            type="button"
            className="text-[10px] opacity-75 cursor-pointer text-primary duration-200 transition-opacity mr-1 hover:opacity-100 leading-[0.4]"
            onClick={() => {
              setValue('amount', maxRefuelValue)
              // debounceFee(1)
            }}
          >
            MAX
          </button>
        </div>
        <Input
          onChange={(e) => {
            const isError = Number.isNaN(Number(e.target.value))

            if (isError) return

            // onChange(e)
            // debounceFee(1)
            console.log(e)
          }}
          disabled={status !== 'connected'}
          autoComplete="off"
          type="number"
          placeholder={`0.01 ${symbolTo ?? 'XXX'}`}
        />

        <span className="absolute text-lg right-3 font-medium">
          {symbolTo}
          XXX
        </span>
      </div>

      <div className="flex items-center justify-between w-full my-5 gap-5 text-sm font-medium max-w-xl mx-auto">
        <span className="flex items-center justify-center rounded-md py-3 max-w-20 w-full border border-primary">
          0
        </span>
        <Slider
          disabled={status !== 'connected'}
          defaultValue={[0.01]}
          max={maxRefuelValue}
          value={[fields.amount]}
          step={0.000001}
          onValueChange={(v) => {
            setValue('amount', v[0])
            // debounceFee(1)
            console.log(v[0])
          }}
        />
        <span className="flex items-center justify-center rounded-md py-3 w-fit min-w-20 px-2 border border-primary">
          {maxRefuelValue ?? 0}
        </span>
      </div>
    </Paper>
  )
}
