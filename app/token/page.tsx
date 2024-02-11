'use client'

import {
  CONTRACTS,
  bridgeToken,
  claimToken,
  estimateBridgeTokenFee,
  getTokenBalance,
} from '@/app/_utils/contract-actions'
import { errorToaster, truncatedToaster } from '@/app/_utils/truncatedToaster'
import { Button } from '@/components/ui/button-new'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { formatEther } from 'viem'

import { Input } from '@/components/ui/input'
import { Popover } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parseEther } from 'viem'
import {
  useAccount,
  useBalance,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from 'wagmi'
import { z } from 'zod'
import {
  ChainList,
  ChainyTrigger,
  Paper,
  RepeatButton,
} from '../_components/chainy/chains-popover'
import { CHAINS } from '../_utils/chains'
import { TokenSchema } from '../_utils/schemas'
import { BalanceIndicator } from '../refuel/_components/balance-indicator'
import { TokenDialog } from './_components/token-dialog'

export default function TokenPage() {
  const { address, chain, status } = useAccount()
  const { switchChain } = useSwitchChain()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [isChainGridView, setIsChainGridView] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const [isLayerZeroTx, setIsLayerZeroTx] = useState(false)

  const { data: _balanceFrom } = useBalance({
    address,
    query: { enabled: !!address },
  })
  const balanceFrom = Number(Number(_balanceFrom?.formatted).toFixed(5))

  const selectedChainId = chain?.id ?? 0

  useEffect(() => {
    form.setValue(
      'chainFrom',
      CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175,
    )
    form.setValue(
      'chainTo',
      CHAINS.filter(({ chainId }) => chainId !== chain?.id)[3].value,
    )
    ;(async () => {
      setValue('tokenBalance', 0)
      const { data }: any = await refetchBalance()
      if (!data) return
      setValue('tokenBalance', Number(formatEther(data)))
    })()
  }, [chain])

  const form = useForm<z.infer<typeof TokenSchema>>({
    resolver: zodResolver(TokenSchema),
    defaultValues: {
      tokenBalance: 0,
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175, // 175
      chainTo: CHAINS.filter(({ chainId }) => chainId !== chain?.id)[3].value, // 102
    },
  })
  const { watch, setValue } = form
  const fields = watch()

  const { refetch: refetchFee } = useReadContract(
    estimateBridgeTokenFee(
      fields.chainTo,
      selectedChainId,
      address!,
      parseEther(fields.bridgeAmount?.toString() ?? '0'),
    ),
  )

  const { refetch: refetchBalance } = useReadContract(
    getTokenBalance(selectedChainId, address!),
  )

  const {
    writeContractAsync,
    isPending,
    data: hash,
  } = useWriteContract({
    mutation: {
      onError(error) {
        errorToaster(error)
      },
    },
  })

  async function onSubmitBridge({
    chainTo,
    bridgeAmount,
    tokenBalance,
  }: z.infer<typeof TokenSchema>) {
    if (!bridgeAmount)
      return truncatedToaster('Error occurred!', 'Invalid amount.')
    if (Number(bridgeAmount) > tokenBalance)
      return truncatedToaster('Error occurred!', 'Insufficient BWHL balance.')

    const { data: fee }: any = await refetchFee()

    if (!fee)
      return truncatedToaster('Error occurred!', 'Failed to fetch refuel cost.')

    const opts = bridgeToken(selectedChainId)

    await writeContractAsync({
      ...opts,
      address: opts.address!,
      value: fee[0],
      args: [
        address,
        chainTo,
        address,
        parseEther(bridgeAmount),
        address,
        '0x0000000000000000000000000000000000000000',
        '',
      ],
    })
    setIsLayerZeroTx(true)
    setIsDialogOpen(true)
  }

  async function onSubmitClaim({ amount }: z.infer<typeof TokenSchema>) {
    const amou = Number(amount) * CONTRACTS[selectedChainId].tokenPrice!

    const value = parseEther(amou.toString())

    const opts = claimToken(selectedChainId)

    await writeContractAsync({
      ...opts,
      address: opts.address!,
      value,
      args: [address, amount],
    })
    setIsLayerZeroTx(false)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Paper title="TOKEN">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitBridge)}>
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
                          isChainGridView={isChainGridView}
                          setIsChainGridView={setIsChainGridView}
                          selectedValue={fields.chainTo}
                          fieldValue={field.value}
                          onSelect={(value, chainId) => {
                            form.setValue('chainFrom', value)
                            setPopoverFromOpen(false)
                            if (chainId !== chain?.id) switchChain({ chainId })
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

                  if (selectedChain?.chainId)
                    switchChain({ chainId: selectedChain?.chainId })
                }}
              />

              <FormField
                control={form.control}
                name="chainTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer to</FormLabel>
                    <Popover
                      open={popoverToOpen}
                      onOpenChange={setPopoverToOpen}
                    >
                      <ChainyTrigger selectedValue={field.value} />
                      <ChainList
                        isChainGridView={isChainGridView}
                        setIsChainGridView={setIsChainGridView}
                        selectedValue={fields.chainFrom}
                        fieldValue={field.value}
                        onSelect={(value) => {
                          form.setValue('chainTo', value)
                          form.setValue('amount', '')
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
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel>Claim tokens</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        placeholder="Amount to claim"
                        autoComplete="off"
                        {...rest}
                        onChange={(e) => {
                          const isError = Number.isNaN(Number(e.target.value))
                          if (isError) return

                          onChange(e)
                        }}
                      />
                      <Button
                        type="button"
                        className="w-32 min-w-32 hover:scale-100 h-12"
                        disabled={status !== 'connected' || !rest.value}
                        loading={isPending}
                        onClick={form.handleSubmit(onSubmitClaim)}
                      >
                        CLAIM
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bridgeAmount"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem className="mt-5">
                  <FormLabel className="flex items-end justify-between">
                    <div className="flex items-end justify-start gap-5">
                      Bridge tokens
                      {!!fields.tokenBalance && (
                        <BalanceIndicator
                          balance={Number(fields.tokenBalance)}
                          symbol="BWHL"
                        />
                      )}
                    </div>

                    <button
                      type="button"
                      className="text-[10px] opacity-75 cursor-pointer text-primary duration-200 transition-opacity mr-1 hover:opacity-100 leading-[0.4] disabled:hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!fields.tokenBalance}
                      onClick={() => {
                        setValue('bridgeAmount', fields.tokenBalance.toString())
                      }}
                    >
                      MAX
                    </button>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      <div className="inline-flex bg-popover items-center rounded px-3">
                        BWHL
                      </div>
                      <Input
                        placeholder="Amount to bridge"
                        autoComplete="off"
                        type="number"
                        {...rest}
                        disabled={!fields.tokenBalance}
                        onChange={(e) => {
                          const isError = Number.isNaN(Number(e.target.value))
                          if (isError) return

                          onChange(e)
                        }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="w-full mt-5 hover:scale-[1.05]"
              type="submit"
              disabled={!fields.tokenBalance || !fields.bridgeAmount}
              loading={isPending || status !== 'connected'}
            >
              BRIDGE
            </Button>
          </form>
        </Form>
      </Paper>
      <TokenDialog
        isLayerZero={isLayerZeroTx}
        hash={hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={selectedChainId}
        chainTo={fields.chainTo}
      />
    </>
  )
}
