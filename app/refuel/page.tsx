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
import { useState } from 'react'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'
import { Slider } from '@/components/ui/slider'
import { SubmitButton } from '../_components/submit-button'
import { truncatedToaster } from '../_utils/truncatedToaster'
import {
  ChainList,
  ChainyTrigger,
  Paper,
} from '../_components/chainy/chains-popover'
import { TransactionSummary } from './_components/transaction-summary'
import { RepeatButton } from '@/app/_components/chainy/chains-popover'
import {
  refuel,
  estimateRefuelFee,
  getAdapter,
} from '@/app/_utils/contract-actions'

export default function RefuelPage() {
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { address, status } = useAccount()

  const { data } = useBalance({
    address,
    onSuccess({ formatted }) {
      form.setValue('balance', Number(formatted))
    },
  })
  const balance = Number(data?.formatted)

  const form = useForm<z.infer<typeof RefuelSchema>>({
    resolver: zodResolver(RefuelSchema),
    defaultValues: {
      amount: balance ? Number((balance / 3).toFixed(5)) : 0,
      balance: balance ?? 0,
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175, // 175
      chainTo: CHAINS.filter(({ chainId }) => chainId !== chain?.id)[0].value, // 102
    },
  })

  const {
    watch,
    setValue,
    formState: { isValid },
  } = form

  const fields = watch()

  const {
    data: feeData,
    error: feeError,
    refetch,
  } = estimateRefuelFee(fields.chainTo, chain?.id ?? 0, address!, fields.amount)

  const { writeAsync, isLoading } = refuel(chain?.id ?? 0)

  async function onFormSubmit({
    amount,
    balance,
    chainTo,
  }: z.infer<typeof RefuelSchema>) {
    if (amount > balance)
      return truncatedToaster(
        'Insufficient balance',
        `Your balance is ${balance} ${data?.symbol}. Please enter amount less than or equal to your balance.`,
      )

    const { data: fee }: any = await refetch()

    if (!fee) return truncatedToaster('Error occurred!', feeError?.message!)

    await writeAsync({
      value: fee[0],
      args: [chainTo, address, getAdapter(amount, address!)],
    })
  }

  return (
    <Paper title="REFUEL GAS">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <div className="w-full flex justify-between items-center md:mb-5 mb-7 gap-5 md:gap-0 md:flex-row flex-col">
            <FormField
              control={form.control}
              name="chainFrom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Transfer from</FormLabel>
                  <Popover
                    open={popoverFromOpen}
                    onOpenChange={setPopoverFromOpen}
                  >
                    <ChainyTrigger
                      disabled={isLoading}
                      selectedValue={field.value}
                    />
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
              }}
            />

            <FormField
              control={form.control}
              name="chainTo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Transfer to</FormLabel>
                  <Popover open={popoverToOpen} onOpenChange={setPopoverToOpen}>
                    <ChainyTrigger
                      disabled={isLoading}
                      selectedValue={field.value}
                    />
                    <ChainList
                      selectedValue={fields.chainFrom}
                      fieldValue={field.value}
                      onSelect={(value) => {
                        form.setValue('chainTo', value)
                        setPopoverToOpen(false)
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
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-end justify-between">
                  Enter Refuel Amount
                  <button
                    type="button"
                    className="text-[10px] opacity-75 cursor-pointer text-primary duration-200 transition-opacity mr-1 hover:opacity-100 leading-[0.4]"
                    disabled={!balance}
                    onClick={() => setValue('amount', balance)}
                  >
                    MAX
                  </button>
                </FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      placeholder={`0.0001 ${!balance ? 'XXX' : data?.symbol}`}
                      {...field}
                      autoComplete="off"
                      type="number"
                      max={balance}
                    />

                    <span className="absolute text-lg right-3 font-medium">
                      {!balance ? 'XXX' : data?.symbol}
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
              defaultValue={[Number((balance / 3).toFixed(5))]}
              max={balance}
              value={[fields.amount]}
              step={0.000001}
              onValueChange={(v) => setValue('amount', v[0])}
            />
            <span className="flex items-center justify-center rounded-md py-3 w-fit min-w-20 px-2 border border-primary">
              {!balance ? '...' : balance.toFixed(5)}
            </span>
          </div>

          <TransactionSummary
            time="5"
            refuelAmount={feeData}
            amount={fields.amount}
            symbol={data?.symbol}
          />

          <SubmitButton disabled={!isValid} loading={isLoading}>
            Refuel
          </SubmitButton>
        </form>
      </Form>
    </Paper>
  )
}
