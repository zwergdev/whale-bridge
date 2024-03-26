'use client'

import { BalanceIndicator } from '@/app/refuel/_components/balance-indicator'
import { LayerZero, ChevronsUpDown, Loader } from '@/components/ui/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Paper,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Button,
} from '@/components/ui'
import { delay } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount, useBalance, useSwitchChain } from 'wagmi'
import {
  ChainPopover,
  RepeatButton,
  SubmitButton,
  TransactionDialog,
} from '@/app/_components'
import {
  useWriteContract,
  useCheckChainTo,
  useSetChainFrom,
  useCustomSwitchChain,
} from '@/app/_hooks'
import { BridgeForm, BridgeSchema, truncatedToaster } from '@/app/_utils'
import { bridgeOpts } from './_contracts/bridge-contracts'
import { USER_NFT, MODERN_USER_NFT } from '@/lib/constants'
import {
  useEstimateBridgeFee,
  useGetModernUserNFTIds,
  useGetUserNFTIds,
  getNFTBalance,
} from '@/app/bridge/_hooks'

export default function BridgePage() {
  const { address, chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoadingNFT, setIsLoadingNFT] = useState(true)
  const { data: _balanceFrom } = useBalance({
    address,
    query: { enabled: !!address },
  })
  const balanceFrom = Number(Number(_balanceFrom?.formatted).toFixed(5))
  const ref = useRef('a')

  const selectedChainId = chain?.id ?? 0

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let active = true
    ;(async () => {
      setIsLoadingNFT(true)
      await delay(2000)

      const recursiveFunction = async (attempt = 0): Promise<any[]> => {
        if (USER_NFT.includes(chain?.id!)) {
          const { data: nfts }: any = await refetchUserNFT()
          return nfts.map((nft: any) => nft.toString())
        }

        if (MODERN_USER_NFT.includes(chain?.id!)) {
          const { data: nfts }: any = await refetchModernUserNFT()
          return nfts.map((nft: any) => nft.toString())
        }

        const maxAttempts = chain?.id === 137 ? 18 : 12
        if (attempt >= maxAttempts || !active) return []

        const nfts = await getNFTBalance(address!, selectedChainId)

        if (nfts.length === 0) {
          await delay(chain?.id === 137 ? 2000 : 1500)
          return recursiveFunction(attempt + 1)
        }

        return nfts
      }

      const nfts = await recursiveFunction()

      if (active) {
        form.setValue('tokenId', nfts?.[nfts.length - 1] ?? '0')
        form.setValue('nfts', nfts ?? [])
        setIsLoadingNFT(false)
      }
    })()

    return () => {
      active = false
    }
  }, [address, chain, ref.current])

  useEffect(() => {
    form.setValue('chainFrom', useSetChainFrom({ chain: chain?.id }))
    form.setValue('chainTo', useCheckChainTo({ watch, chain: chain?.id })!)
  }, [chain])

  const form = useForm<BridgeForm>({
    resolver: zodResolver(BridgeSchema),
    defaultValues: {
      chainFrom: useSetChainFrom({ chain: chain?.id }), // 175
      chainTo: useCheckChainTo({ chain: chain?.id })!, // 102
      tokenId: '0',
      nfts: [],
    },
  })

  const {
    watch,
    formState: { isValid },
  } = form

  const fields = watch()

  const { data: hash, writeContractAsync, isPending } = useWriteContract()

  const { refetchFee } = useEstimateBridgeFee(
    fields.chainTo,
    BigInt(fields.tokenId),
    selectedChainId,
  )

  const { refetchUserNFT } = useGetUserNFTIds(selectedChainId)
  const { refetchModernUserNFT } = useGetModernUserNFTIds(selectedChainId)

  const refetchNFT = async () => {
    setIsLoadingNFT(true)
    const nfts = await getNFTBalance(address!, selectedChainId)
    setIsLoadingNFT(false)
    return nfts
  }

  async function bridgeNFT({ chainTo, tokenId }: BridgeForm) {
    if (tokenId === '0') {
      const nfts = await refetchNFT()

      if (!nfts?.length)
        return truncatedToaster(
          'Error occurred!',
          'You do not have any NFTs to bridge.',
        )

      tokenId = nfts[nfts.length - 1]
    }

    const { data: fee }: any = await refetchFee()

    if (!fee)
      return truncatedToaster('Error occurred!', 'Failed to fetch refuel cost.')

    await writeContractAsync({
      ...bridgeOpts(selectedChainId),
      value: fee[0],
      args: [
        address!,
        chainTo,
        address!,
        BigInt(tokenId),
        address!,
        '0x0000000000000000000000000000000000000000',
        '0x00010000000000000000000000000000000000000000000000000000000000030d40',
      ],
    })

    setIsDialogOpen(true)

    const newNFTs = fields.nfts.filter((nft) => nft !== tokenId)
    form.setValue('nfts', newNFTs)
    form.setValue('tokenId', newNFTs[newNFTs.length - 1] ?? '0')
  }

  return (
    <>
      <Paper title="NFT BRIDGE">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(bridgeNFT)} className="relative">
            <FormField
              control={form.control}
              name="tokenId"
              render={({ field }) => (
                <FormItem className="absolute -top-12 right-0">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex items-center justify-center gap-2 pl-2">
                        Select NFT
                        <ChevronsUpDown />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingNFT ? (
                        <Loader className="my-4 h-5 animate-spin-slow flex justify-center w-full" />
                      ) : fields.nfts.length ? (
                        fields.nfts.map((token) => (
                          <SelectItem value={token} key={token}>
                            {token}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="mx-2 text-xl">No NFTs found!</p>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="w-full flex justify-between items-center mb-16 gap-5 md:gap-0 md:flex-row flex-col">
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
                      isPopoverFROM={true}
                      fieldValue={field.value}
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
                  ref.current = Date.now().toString()
                  useCustomSwitchChain({
                    switchChain(chainId) {
                      switchChain({ chainId })
                    },
                    setValue: form.setValue,
                    chainFrom: fields.chainFrom,
                    chainTo: fields.chainTo,
                  })
                }}
              />

              <FormField
                control={form.control}
                name="chainTo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Transfer to</FormLabel>
                    <ChainPopover
                      disabledChains={[165]}
                      selectedValue={fields.chainFrom}
                      fieldValue={field.value}
                      onSelect={(value) => {
                        form.setValue('chainTo', value)
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>

            {!isLoadingNFT && !fields.nfts.length && address && (
              <div className="flex items-center justify-start mb-2">
                <p className="mx-2 text-lg">No NFTs found!</p>
                <Button
                  type="button"
                  className="text-sm py-2 max-w-40 w-full"
                  onClick={async () => {
                    const nfts = await refetchNFT()
                    form.setValue('nfts', nfts ?? [])
                  }}
                >
                  Retry
                </Button>
              </div>
            )}

            <SubmitButton
              disabled={!isValid}
              loading={isPending || isLoadingNFT}
            >
              {isLoadingNFT ? 'Loading NFT...' : 'Bridge'}
            </SubmitButton>

            <a href="https://layerzero.network/" rel="noreferrer">
              <LayerZero className="text-center w-full mt-10" />
            </a>
          </form>
        </Form>
      </Paper>
      <TransactionDialog
        hash={hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={selectedChainId}
        chainTo={fields.chainTo}
      />
    </>
  )
}
