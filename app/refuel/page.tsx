'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { RefuelSchema } from '../_utils/schemas'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Popover } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { CHAINS } from '../_utils/chains'
import { useEffect, useState } from 'react'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'
import { Slider } from '@/components/ui/slider'
import {
  ChainList,
  ChainyTrigger,
  Paper,
} from '../_components/chainy/chains-popover'
import { RepeatButton } from '@/app/_components/chainy/chains-popover'
import { Transaction } from './_components/transaction'
import { Prices, fetchPrices } from './_components/actions'
import { useDebouncedCallback } from 'use-debounce'
import { estimateRefuelFee } from '@/app/_utils/contract-actions'
import { formatEther } from 'viem'

const MAX_REFUEL: { [chainId: number]: number } = {
  42170: 0.02, // arbitrum-nova
  56: 1.23, // bsc
  137: 610.36, // polygon
  42161: 0.01, // arbitrum
  534352: 0.02, // scroll
  324: 0.02, // zk
  10: 0.02, // optimism
}

const SYMBOL_TO_CHAIN: { [key: string]: string } = {
  ETH: 'ethereum',
  BNB: 'binancecoin',
  MATIC: 'matic-network',
}

export default function RefuelPage() {
  const [prices, setPrices] = useState<Prices>()
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const [fee, setFee] = useState<bigint>()
  const [isFeeLoading, setIsFeeLoading] = useState(false)
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { address, status } = useAccount()
  const { data: _balanceFrom } = useBalance({
    address,
    onSuccess({ formatted }) {
      form.setValue('balance', Number(formatted))
    },
  })
  const balanceFrom = Number(Number(_balanceFrom?.formatted).toFixed(5))

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
  }, [chain])

  const form = useForm<z.infer<typeof RefuelSchema>>({
    resolver: zodResolver(RefuelSchema),
    defaultValues: {
      amount: 0,
      balance: balanceFrom ?? 0,
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
  })
  const balanceTo = Number(Number(_balanceTo?.formatted).toFixed(5))

  const { refetch } = estimateRefuelFee(
    fields.chainTo,
    chain?.unsupported ? 0 : chain?.id ?? 0,
    address!,
    fields.amount,
  )

  const debounceFee = useDebouncedCallback(async (value) => {
    setIsFeeLoading(true)
    console.log('debounced-amount:', value)
    const { data: fee }: any = await refetch()
    setFee(fee ? fee[0] : BigInt(0))
    setIsFeeLoading(false)
  }, 500)

  const feeAmount = () => {
    if (isFeeLoading) return '...'

    const symbol = _balanceFrom?.symbol

    if (fee && symbol && prices) {
      const amount = Number(formatEther(fee))

      const usd = prices[SYMBOL_TO_CHAIN[symbol]].usd

      return `${amount.toFixed(4)} ${symbol} ($${(amount * usd).toFixed(0)})`
    }
    return '...'
  }

  const expectedOutput = () => {
    if (isFeeLoading) return '...'

    const symbol = _balanceTo?.symbol

    if (fee && symbol && prices) {
      const amount = fields.amount

      const usd = prices[SYMBOL_TO_CHAIN[symbol]].usd

      return `${amount.toFixed(4)} ${symbol} ($${(amount * usd).toFixed(0)})`
    }
    return '...'
  }

  return (
    <Paper title="REFUEL GAS">
      <Form {...form}>
        <form>
          <div className="w-full flex justify-between items-center md:mb-5 mb-7 gap-5 md:gap-0 md:flex-row flex-col">
            <FormField
              control={form.control}
              name="chainFrom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-end justify-between">
                    Transfer from
                    <span className="mr-2 text-[10px] opacity-75 text-primary leading-[0.4]">
                      Bal:
                      {!balanceFrom
                        ? ` 0 ${_balanceFrom?.symbol ?? 'XXX'}`
                        : ` ${balanceFrom} ${_balanceFrom?.symbol}`}
                    </span>
                  </FormLabel>
                  <Popover
                    open={popoverFromOpen}
                    onOpenChange={setPopoverFromOpen}
                  >
                    <ChainyTrigger selectedValue={field.value} />
                    <ChainList
                      selectedValue={fields.chainTo}
                      fieldValue={field.value}
                      onSelect={(value, chainId) => {
                        form.setValue('chainFrom', value)
                        setPopoverFromOpen(false)
                        if (chainId !== chain?.id) switchNetwork?.(chainId)
                      }}
                    />
                  </Popover>
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

                if (selectedChain?.value !== chain?.id)
                  switchNetwork?.(selectedChain?.chainId)
              }}
            />

            <FormField
              control={form.control}
              name="chainTo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-end justify-between">
                    Transfer to
                    <span className="mr-2 text-[10px] opacity-75 text-primary leading-[0.4]">
                      Bal:
                      {!balanceTo
                        ? ` 0 ${_balanceTo?.symbol ?? 'XXX'}`
                        : ` ${balanceTo} ${_balanceTo?.symbol}`}
                    </span>
                  </FormLabel>
                  <Popover open={popoverToOpen} onOpenChange={setPopoverToOpen}>
                    <ChainyTrigger selectedValue={field.value} />
                    <ChainList
                      selectedValue={fields.chainFrom}
                      fieldValue={field.value}
                      onSelect={(value) => {
                        form.setValue('chainTo', value)
                        setPopoverToOpen(false)
                        debounceFee(1)
                      }}
                    />
                  </Popover>
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
                  <div className="flex gap-5 items-end">
                    <p>Enter Refuel Amount</p>
                    <p className="text-[10px] opacity-75 mb-1 text-primary leading-[0.4]">
                      Refuel cost: {feeAmount()}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-[10px] opacity-75 cursor-pointer text-primary duration-200 transition-opacity mr-1 hover:opacity-100 leading-[0.4]"
                    onClick={() => {
                      setValue('amount', MAX_REFUEL[balanceToChainId ?? 0])
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
                        onChange(e)
                        debounceFee(1)
                      }}
                      autoComplete="off"
                      type="number"
                      max={MAX_REFUEL[balanceToChainId ?? 0]}
                      placeholder={`0.01 ${_balanceTo?.symbol ?? 'XXX'}`}
                    />

                    <span className="absolute text-lg right-3 font-medium">
                      {_balanceTo?.symbol ?? 'XXX'}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
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
              max={MAX_REFUEL[balanceToChainId ?? 0]}
              value={[fields.amount]}
              step={0.000001}
              onValueChange={(v) => {
                setValue('amount', v[0])
                debounceFee(1)
              }}
            />
            <span className="flex items-center justify-center rounded-md py-3 w-fit min-w-20 px-2 border border-primary">
              {MAX_REFUEL[balanceToChainId ?? 0] ?? 0}
            </span>
          </div>

          <Transaction
            amount={fields.amount}
            balance={fields.balance}
            chainTo={fields.chainTo}
            fee={feeAmount()}
            expectedOutput={expectedOutput()}
          />
        </form>
      </Form>
    </Paper>
  )
}
