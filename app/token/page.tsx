'use client'
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from '@/components/ui/form'
import {
  ChainList,
  ChainyTrigger,
  Paper,
  RepeatButton,
} from '../_components/chainy/chains-popover'
import { estimateRefuelFee } from '@/app/_utils/contract-actions'
import { useForm } from 'react-hook-form'
import { Popover } from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CHAINS } from '../_utils/chains'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'
import { z } from 'zod'
import { TokenSchema } from '../_utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { BalanceIndicator } from '../refuel/_components/balance-indicator'

export default function TokenPage() {
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [fee, setFee] = useState<bigint>()
  const [isFeeLoading, setIsFeeLoading] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const { address } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const { data: _balanceFrom } = useBalance({
    address,
    onSuccess({ formatted }) {
      form.setValue('balance', Number(formatted))
    },
  })
  const balanceFrom = Number(Number(_balanceFrom?.formatted).toFixed(5))

  const selectedChainId = chain?.unsupported ? 0 : chain?.id ?? 0
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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

  const form = useForm<z.infer<typeof TokenSchema>>({
    resolver: zodResolver(TokenSchema),
    defaultValues: {
      amount: 0,
      balance: balanceFrom ?? 0,
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175, // 175
      chainTo: CHAINS.filter(({ chainId }) => chainId !== chain?.id)[0].value, // 102
    },
  })

  const { watch } = form
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
    selectedChainId,
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
  return (
    <>
      <Paper title="TOKEN">
        <Form {...form}>
          <form>
            <div className="w-full flex justify-between items-center md:mb-5 mb-7 gap-5 md:gap-0 md:flex-row flex-col">
              <FormField
                control={form.control}
                name="chainFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-end justify-between">
                      Transfer from
                      <BalanceIndicator
                        balance={balanceFrom}
                        symbol={_balanceFrom?.symbol}
                      />
                    </FormLabel>
                    <FormControl>
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
                    </FormControl>
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
                  <FormItem>
                    <FormLabel className="flex items-end justify-between">
                      Transfer to
                      <BalanceIndicator
                        balance={balanceTo}
                        symbol={_balanceTo?.symbol}
                      />
                    </FormLabel>
                    <Popover
                      open={popoverToOpen}
                      onOpenChange={setPopoverToOpen}
                    >
                      <ChainyTrigger selectedValue={field.value} />
                      <ChainList
                        selectedValue={fields.chainFrom}
                        fieldValue={field.value}
                        onSelect={(value) => {
                          form.setValue('chainTo', value)
                          form.setValue('amount', 0)
                          setPopoverToOpen(false)
                          debounceFee(1)
                        }}
                      />
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>Claim tokens</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input type="number" placeholder="Amount to claim" />
                  <Button size="sm">CLAIM</Button>
                </div>
              </FormControl>
            </FormItem>

            {/* TODO change to we own coin */}
            <FormItem className="mt-5">
              <FormLabel className="flex items-end justify-between">
                Token to bridge
                <button
                  type="button"
                  className="text-[10px] opacity-75 cursor-pointer text-primary duration-200 transition-opacity mr-1 hover:opacity-100 leading-[0.4]"
                >
                  MAX
                </button>
              </FormLabel>
              <FormControl>
                <div className="flex gap-3">
                  <div className="inline-flex bg-popover items-center rounded px-3">
                    COIN
                  </div>
                  <Input placeholder="Enter amount of COIN to bridge" />
                </div>
              </FormControl>
            </FormItem>

            <Button className="w-full mt-3">BRIDGE</Button>
          </form>
        </Form>
      </Paper>
    </>
  )
}
