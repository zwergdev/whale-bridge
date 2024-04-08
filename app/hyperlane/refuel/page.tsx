'use client'
import { ChainPopover, RepeatButton, SubmitButton } from '@/app/_components'
import {
  useCheckChainTo,
  useCustomSwitchChain,
  useGetBalance,
  useGetBalanceTo,
  useSetChainFrom,
} from '@/app/_hooks'
import { useGetAccount } from '@/app/_hooks/use-get-account'
import { RefuelForm, RefuelSchema } from '@/app/_utils'
import { BalanceIndicator } from '@/app/refuel/_components'
import {
  Paper,
  Slider,
  Input,
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
} from '@/components/ui'
import { CHAINS, MAX_REFUEL } from '@/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSwitchChain } from 'wagmi'
import { Fuel } from '@/components/ui/icons'

export default function HyperlaneRefuel() {
  const { status, chainId, chain } = useGetAccount()
  const { switchChain } = useSwitchChain()
  const { symbol, balanceFrom } = useGetBalance()

  useEffect(() => {
    setValue('chainFrom', useSetChainFrom({ chain: chainId! }))
    setValue('chainTo', useCheckChainTo({ watch, chain: chainId! })!)
    setValue('amount', 0)
    // setFee(BigInt(0))
  }, [chainId])

  const form = useForm<RefuelForm>({
    resolver: zodResolver(RefuelSchema),
    defaultValues: {
      amount: 0,
      chainFrom: useSetChainFrom({ chain: chainId! }), // 175
      chainTo: useCheckChainTo({ chain: chainId! })!, // 102
    },
  })

  const { watch, setValue } = form
  const fields = watch()

  const balanceToChainId = CHAINS.find(({ value }) => value === fields?.chainTo)
    ?.chainId!

  const maxRefuelValue =
    fields.chainFrom === 145 && fields.chainTo === 125
      ? 1 // gnosis --> celo
      : MAX_REFUEL[balanceToChainId ?? 0]

  const { balanceTo, symbolTo } = useGetBalanceTo(balanceToChainId)

  return (
    <Paper
      title="REFUEL GAS"
      subtitle={
        <div className="flex justify-center items-center gap-1.5 text-xs opacity-75 border border-primary py-2 px-3 rounded">
          <Fuel size={14} className="mb-0.5 stroke-yellow-200" />
          <span className="font-bold">
            Free{' '}
            <span className="line-through ml-1 text-yellow-200">(0.01%)</span>
          </span>
        </div>
      }
    >
      <Form {...form}>
        <form>
          <div className="w-full flex justify-between items-center md:mb-5 mb-7 gap-5 md:gap-0 md:flex-row flex-col">
            <div className="flex flex-col">
              <div className="flex w-full items-center justify-between">
                <span>Transfer from</span>
                <BalanceIndicator balance={balanceFrom} symbol={symbol} />
              </div>
              <ChainPopover
                selectedValue={fields.chainTo}
                // fieldValue={field.value}
                fieldValue={fields.chainFrom}
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
                fieldValue={fields.chainTo}
                onSelect={(value) => {
                  setValue('chainTo', value)
                  setValue('amount', 0)
                  // setFee(BigInt(0))
                }}
              />
            </div>
          </div>
          {/* @TODO: refactor this code block */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel className="flex items-end justify-between">
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
                </FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      {...rest}
                      onChange={(e) => {
                        const isError = Number.isNaN(Number(e.target.value))

                        if (isError) return

                        onChange(e)
                        // debounceFee(1)
                      }}
                      disabled={status !== 'connected'}
                      autoComplete="off"
                      type="number"
                      placeholder={`0.01 ${symbolTo}`}
                    />

                    <span className="absolute text-lg right-3 font-medium">
                      {symbolTo}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
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

          <FormLabel className="mb-4">Transaction Summary</FormLabel>
          <div>
            <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5">
              Estimated Transfer Time:
              <span className="font-semibold">
                ~{fields.chainFrom === 109 ? '18 mins' : '1 min'}
              </span>
            </div>

            <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary">
              Refuel cost:
              {/* <span className="font-semibold">{feeAmount()}</span> */}
            </div>

            <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary md:mb-5 mb-2">
              Expected Output:
              {/* <span className="font-semibold">{expectedOutput()}</span> */}
            </div>
          </div>

          <SubmitButton
            disabled={false}
            loading={false}
            // disabled={
            //   !!infoBalanceFrom && !!fee && fee > infoBalanceFrom?.value
            // }
            // loading={isFeeLoading || isLoadingRefuel}
          >
            {/* {!!infoBalanceFrom && !!fee && fee > infoBalanceFrom?.value
              ? 'Insufficient balance'
              : 'Refuel'} */}
            Refuel
          </SubmitButton>
        </form>
      </Form>
    </Paper>
  )
}
