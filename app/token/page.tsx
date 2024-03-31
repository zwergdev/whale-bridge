'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Label,
  Paper,
  ButtonNew,
} from '@/components/ui'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { formatEther, parseEther } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'
import {
  ChainPopover,
  RepeatButton,
  TransactionDialog,
  InfoHover
} from '@/app/_components'
import {
  useCheckChainTo,
  useCustomSwitchChain,
  useSetChainFrom,
  useWriteContract,
} from '@/app/_hooks'
import { TokenForm, TokenSchema, truncatedToaster } from '@/app/_utils'
import { BalanceIndicator } from '../refuel/_components/balance-indicator'
import tokenImage from './_assets/token.webp'
import {
  TOKEN_CONTRACTS,
  bridgeToken,
  claimToken,
} from './_contracts/token-contracts'
import {
  useGetBalance,
  useGetTokenBalance,
  useGetTokenFee,
} from './_hooks/actions'

export default function TokenPage() {
  const { address, chain, status } = useAccount()
  const { switchChain } = useSwitchChain()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLayerZeroTx, setIsLayerZeroTx] = useState(false)

  const { balance, symbol } = useGetBalance()

  const selectedChainId = chain?.id ?? 0

  useEffect(() => {
    form.setValue('chainFrom', useSetChainFrom({ chain: chain?.id }))
    form.setValue('chainTo', useCheckChainTo({ watch, chain: chain?.id })!)
    debounceTokenBalance(1)
    setValue('bridgeAmount', undefined)
  }, [chain])

  const debounceTokenBalance = useDebouncedCallback(async (v) => {
    setValue('tokenBalance', 0)
    const { data }: any = await refetchBalance()
    if (!data || !v) return
    setValue('tokenBalance', Number(formatEther(data)))
  }, 500)

  const form = useForm<TokenForm>({
    resolver: zodResolver(TokenSchema),
    defaultValues: {
      tokenBalance: 0,
      chainFrom: useSetChainFrom({ chain: chain?.id }), // 175
      chainTo: useCheckChainTo({ chain: chain?.id })!, // 102
    },
  })
  const { watch, setValue, register } = form
  const fields = watch()

  const { refetchFee } = useGetTokenFee(
    fields.chainTo,
    selectedChainId,
    fields.bridgeAmount,
  )

  const { refetchBalance } = useGetTokenBalance(selectedChainId)

  const { writeContractAsync, isPending, data: hash } = useWriteContract()

  async function onSubmitBridge({
    chainTo,
    chainFrom,
    bridgeAmount,
    tokenBalance,
  }: z.infer<typeof TokenSchema>) {
    const isDisabledChainUsed = [176, 150].some(
      (id) => id === chainFrom || id === chainTo,
    )
    if (isDisabledChainUsed)
      return truncatedToaster('Ooops...', 'This chain is temporary disabled.')
    // @TODO: remove later logic above

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

    setValue('tokenBalance', fields.tokenBalance - Number(bridgeAmount))
  }

  async function onSubmitClaim() {
    const isDisabledChainUsed = [176, 150].some(
      (id) => id === fields.chainFrom || id === fields.chainTo,
    )
    if (isDisabledChainUsed)
      return truncatedToaster('Ooops...', 'This chain is temporary disabled.')

    // @TODO: remove later logic above

    const amount = fields.amount

    const sum = (
      Number(amount) * TOKEN_CONTRACTS[selectedChainId].price!
    ).toFixed(10)

    const value = parseEther(sum)

    const opts = claimToken(selectedChainId)

    await writeContractAsync({
      ...opts,
      address: opts.address!,
      value,
      args: [address, amount],
    })
    setIsLayerZeroTx(false)
    setIsDialogOpen(true)

    setValue('tokenBalance', fields.tokenBalance + Number(amount))
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
                      <BalanceIndicator balance={balance} symbol={symbol} />
                    </FormLabel>
                    <FormControl>
                      <ChainPopover
                        selectedValue={fields.chainTo}
                        disabledChains={[176, 150, 230]}
                        fieldValue={field.value}
                        isPopoverFROM={true}
                        onSelect={(value, chainId) => {
                          form.setValue('chainFrom', value)
                          if (chainId !== chain?.id) switchChain({ chainId })
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <RepeatButton
                onClick={() =>
                  useCustomSwitchChain({
                    switchChain(chainId) {
                      switchChain({ chainId })
                    },
                    setValue: form.setValue,
                    chainFrom: fields.chainFrom,
                    chainTo: fields.chainTo,
                  })
                }
              />

              <FormField
                control={form.control}
                name="chainTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer to</FormLabel>
                    <ChainPopover
                      selectedValue={fields.chainFrom}
                      disabledChains={[176, 150, 165, 230]}
                      fieldValue={field.value}
                      onSelect={(value) => {
                        form.setValue('chainTo', value)
                        form.setValue('amount', '')
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>

            <Label className="leading-10 flex items-center">
              Claim $BWHL
              <InfoHover desc="$BWHL has an unlimited supply, the token is not intended for trading." />
            </Label>
            <div className="flex items-center justify-between w-full gap-3 sm:flex-row flex-col">
              <Input
                type="number"
                placeholder="Amount to claim"
                autoComplete="off"
                {...register('amount')}
              />
              <div className="flex items-center gap-3 sm:w-auto w-full">
                <Image
                  src={tokenImage}
                  alt="token-image"
                  width={32}
                  height={32}
                />
                <ButtonNew
                  type="button"
                  className="min-w-32 sm:w-auto w-full hover:scale-100 h-12"
                  disabled={
                    status !== 'connected' || !fields.amount || isPending
                  }
                  onClick={onSubmitClaim}
                >
                  CLAIM
                </ButtonNew>
              </div>
            </div>

            <p className="w-full text-center mt-6 text-lg font-semibold">AND</p>

            <div className="mt-5">
              <Label className="flex items-end justify-between mb-2">
                <div className="flex items-end justify-start gap-5">
                  <div className="flex items-center">
                    Bridge $BWHL
                    <InfoHover desc="Bridge $BWHL to other chain." />
                  </div>

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
              </Label>
              <div className="flex gap-3">
                <div className="flex justify-center bg-popover items-center rounded px-2">
                  <Image
                    src={tokenImage}
                    alt="token-image"
                    width={36}
                    height={36}
                  />
                </div>
                <Input
                  placeholder="Amount to bridge"
                  autoComplete="off"
                  type="number"
                  {...register('bridgeAmount')}
                  disabled={!fields.tokenBalance}
                />
              </div>
            </div>

            <ButtonNew
              className="w-full mt-5 hover:scale-[1.05]"
              type="submit"
              disabled={!fields.tokenBalance || !fields.bridgeAmount}
              loading={isPending || status !== 'connected'}
            >
              {status === 'disconnected' ? 'CONNECT WALLET' : 'BRIDGE'}
            </ButtonNew>
          </form>
        </Form>
      </Paper>
      <TransactionDialog
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
