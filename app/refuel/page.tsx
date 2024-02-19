'use client'

import { RepeatButton } from '@/app/_components/chainy/chains-popover'
import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Paper } from '@/components/ui/paper'
import { Slider } from '@/components/ui/slider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Fuel, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { formatEther } from 'viem'
import { parseEther } from 'viem/utils'
import { useAccount, useBalance, useSwitchChain } from 'wagmi'
import { ChainPopover } from '../_components/chainy'
import { SubmitButton } from '../_components/submit-button'
import { useWriteContract } from '../_hooks'
import { CHAINS } from '../_utils/chains'
import { RefuelForm, RefuelSchema } from '../_utils/schemas'
import { BalanceIndicator } from './_components/balance-indicator'
import { RefueledDialog } from './_components/refueled-dialog'
import { MAX_REFUEL, SYMBOL_TO_CHAIN } from './_constants'
import { getRefuelAdapter, refuelOpts } from './_contracts/refuel-contracts'
import { useEstimateRefuelFee } from './_hooks/actions'
import { Prices, fetchPrices } from './_hooks/fetch-prices'

export default function RefuelPage() {
  const [prices, setPrices] = useState<Prices>()
  const [fee, setFee] = useState<bigint>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFeeLoading, setIsFeeLoading] = useState(false)
  const { switchChain } = useSwitchChain()
  const { address, status, chain } = useAccount()
  const { data: _balanceFrom } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  })
  const balanceFrom = Number(Number(_balanceFrom?.formatted).toFixed(5))

  const selectedChainId = chain?.id ?? 0

  useEffect(() => {
    ;(async () => {
      const prices = await fetchPrices()
      setPrices(prices)
    })()
  }, [])

  useEffect(() => {
    form.setValue(
      'chainFrom',
      CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175,
    )
    form.setValue(
      'chainTo',
      CHAINS.filter(({ chainId }) => chainId !== chain?.id)[0].value,
    )
    form.setValue('amount', 0)
    setFee(BigInt(0))
  }, [chain])

  const form = useForm<RefuelForm>({
    resolver: zodResolver(RefuelSchema),
    defaultValues: {
      amount: 0,
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175, // 175
      chainTo: CHAINS.filter(({ chainId }) => chainId !== chain?.id)[0].value, // 102
    },
  })

  const { watch, setValue } = form

  const fields = watch()

  const balanceToChainId = CHAINS.find(
    ({ value }) => value === fields?.chainTo,
  )?.chainId

  const { data: _balanceTo } = useBalance({
    chainId: balanceToChainId,
    address,
    query: {
      enabled: !!address,
    },
  })
  const balanceTo = Number(Number(_balanceTo?.formatted).toFixed(5))

  const maxRefuelValue =
    fields.chainFrom === 145 && fields.chainTo === 125
      ? 1 // gnosis --> celo
      : MAX_REFUEL[balanceToChainId ?? 0]

  const { refetchFee } = useEstimateRefuelFee(
    fields.chainTo,
    selectedChainId,
    fields.amount,
  )

  const {
    data: hash,
    writeContractAsync,
    isPending: isLoadingRefuel,
  } = useWriteContract()

  const debounceFee = useDebouncedCallback(async (value) => {
    setIsFeeLoading(true)
    console.log('debounced-amount:', value)
    const { data: fee }: any = await refetchFee()
    setFee(fee ? fee[0] : BigInt(0))
    setIsFeeLoading(false)
  }, 500)

  const feeAmount = () => {
    if (isFeeLoading) return '...'

    const symbol = _balanceFrom?.symbol

    if (fee && symbol && prices) {
      const amount = Number(formatEther(fee))

      const usd = prices[SYMBOL_TO_CHAIN[symbol]].usd

      return `${amount.toFixed(5)} ${symbol} ($${(amount * usd).toFixed(2)})`
    }
    return '...'
  }

  const expectedOutput = () => {
    if (isFeeLoading) return '...'

    const symbol = _balanceTo?.symbol

    if (fee && symbol && prices) {
      const amount = fields.amount

      const usd = prices[SYMBOL_TO_CHAIN[symbol]].usd

      return `${Number(amount).toFixed(5)} ${symbol} ($${(amount * usd).toFixed(
        2,
      )})`
    }
    return '...'
  }

  async function onSubmit({ chainTo, amount }: RefuelForm) {
    const { data: fee }: any = await refetchFee()

    if (!fee)
      return truncatedToaster('Error occurred!', 'Failed to fetch refuel cost.')

    if (!_balanceFrom)
      return truncatedToaster('Error occurred!', 'Balance undefined.')

    if (fee[0] > _balanceFrom?.value) {
      return truncatedToaster('Error occurred!', 'Insufficient balance.')
    }

    await writeContractAsync({
      ...refuelOpts(selectedChainId),
      value: fee[0],
      args: [
        chainTo,
        address,
        getRefuelAdapter(parseEther(amount.toString()), address!),
      ],
    })

    setIsDialogOpen(true)
  }

  return (
    <>
      <Paper
        title="REFUEL GAS"
        subtitle={
          <div className="flex items-center justify-center gap-1.5 text-xs opacity-75 border border-primary py-2 px-3 rounded">
            <Fuel size={14} className="mb-0.5 stroke-yellow-200" />
            <span className="font-bold">
              Free{' '}
              <span className="line-through ml-1 text-yellow-200">(0.01%)</span>
            </span>
          </div>
        }
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex justify-between items-center md:mb-5 mb-7 gap-5 md:gap-0 md:flex-row flex-col">
              <FormField
                control={form.control}
                name="chainFrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-end justify-between">
                      Transfer from
                      <BalanceIndicator
                        balance={balanceFrom}
                        symbol={_balanceFrom?.symbol}
                      />
                    </FormLabel>
                    <ChainPopover
                      selectedValue={fields.chainTo}
                      fieldValue={field.value}
                      isPopoverFROM-
                      onSelect={(value, chainId) => {
                        form.setValue('chainFrom', value)
                        if (chainId !== chain?.id) switchChain({ chainId })
                      }}
                    />
                  </FormItem>
                )}
              />

              <RepeatButton
                onClick={() => {
                  form.setValue('chainFrom', fields.chainTo)
                  form.setValue('chainTo', fields.chainFrom)
                  const selectedChain = CHAINS.find(
                    ({ value }) => value === fields.chainTo,
                  )

                  if (selectedChain?.chainId)
                    switchChain({ chainId: selectedChain.chainId })
                }}
              />

              <FormField
                control={form.control}
                name="chainTo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-end justify-between">
                      Transfer to
                      <BalanceIndicator
                        balance={balanceTo}
                        symbol={_balanceTo?.symbol}
                      />
                    </FormLabel>
                    <ChainPopover
                      selectedValue={fields.chainFrom}
                      disabledChains={[165]}
                      fieldValue={field.value}
                      onSelect={(value) => {
                        form.setValue('chainTo', value)
                        form.setValue('amount', 0)
                        setFee(BigInt(0))
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>

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
                        debounceFee(1)
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
                          debounceFee(1)
                        }}
                        disabled={status !== 'connected'}
                        autoComplete="off"
                        type="number"
                        placeholder={`0.01 ${_balanceTo?.symbol ?? 'XXX'}`}
                      />

                      <span className="absolute text-lg right-3 font-medium">
                        {_balanceTo?.symbol ?? 'XXX'}
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
                  debounceFee(1)
                }}
              />
              <span className="flex items-center justify-center rounded-md py-3 w-fit min-w-20 px-2 border border-primary">
                {maxRefuelValue ?? 0}
              </span>
            </div>

            {isFeeLoading ? (
              <Loader className="mt-4 mb-6 h-7 animate-spin-slow flex justify-center w-full" />
            ) : (
              feeAmount() !== '...' &&
              expectedOutput() !== '...' && (
                <>
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
                      <span className="font-semibold">{feeAmount()}</span>
                    </div>

                    <div className="flex items-center justify-between w-full font-medium md:text-base text-xs py-2.5 border-t border-t-primary md:mb-5 mb-2">
                      Expected Output:
                      <span className="font-semibold">{expectedOutput()}</span>
                    </div>
                  </div>
                </>
              )
            )}

            <SubmitButton
              disabled={!!_balanceFrom && !!fee && fee > _balanceFrom?.value}
              loading={isFeeLoading || isLoadingRefuel}
            >
              {!!_balanceFrom && !!fee && fee > _balanceFrom?.value
                ? 'Insufficient balance'
                : 'Refuel'}
            </SubmitButton>
          </form>
        </Form>
      </Paper>
      <RefueledDialog
        hash={hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={selectedChainId}
        chainTo={fields.chainTo}
      />
    </>
  )
}
