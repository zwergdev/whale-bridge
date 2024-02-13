'use client'

import { RepeatButton } from '@/app/_components/chainy/chains-popover'
import { BalanceIndicator } from '@/app/refuel/_components/balance-indicator'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { LayerZero } from '@/components/ui/icons'
import { Popover } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { delay } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronsUpDown, Loader } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useAccount,
  useBalance,
  useReadContract,
  useSwitchChain,
  useWriteContract,
} from 'wagmi'
import * as z from 'zod'
import {
  ChainList,
  ChainyTrigger,
  Paper,
} from '../_components/chainy/chains-popover'
import { SubmitButton } from '../_components/submit-button'
import { CHAINS } from '../_utils/chains'
import {
  bridge,
  estimateBridgeFee,
  getModernUserNFTIds,
  getUserNFTIds,
} from '../_utils/contract-actions'
import { getNFTBalance } from '../_utils/nftBalance'
import { BridgeSchema } from '../_utils/schemas'
import { truncatedToaster } from '../_utils/truncatedToaster'
import { BridgedDialog } from './_components/bridged-dialog'

export default function BridgePage() {
  const { address, chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoadingNFT, setIsLoadingNFT] = useState(true)
  const [isChainGridView, setIsChainGridView] = useState(false)
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
        if (
          chain?.id === 42220 ||
          chain?.id === 1101 ||
          chain?.id === 82 ||
          chain?.id === 1285 ||
          chain?.id === 1666600000
        ) {
          const { data: nfts }: any = await refetchUserNFTIds()
          return nfts.map((nft: any) => nft.toString())
        }

        if (
          chain?.id === 204 ||
          chain?.id === 2222 ||
          chain?.id === 7777777 ||
          chain?.id === 8217 ||
          chain?.id === 1116 ||
          chain?.id === 5000 ||
          chain?.id === 122
        ) {
          const { data: nfts }: any = await refetchModernUserNFTIds()
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
    form.setValue(
      'chainFrom',
      CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175,
    )
    form.setValue(
      'chainTo',
      CHAINS.filter(({ chainId }) => chainId !== chain?.id)[0].value,
    )
  }, [chain])

  const form = useForm<z.infer<typeof BridgeSchema>>({
    resolver: zodResolver(BridgeSchema),
    defaultValues: {
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175, // 175
      chainTo: CHAINS.filter(({ chainId }) => chainId !== chain?.id)[0].value, // 102
      tokenId: '0',
      nfts: [],
    },
  })
  const {
    watch,
    formState: { isValid },
  } = form

  const fields = watch()

  const {
    data: bridgingData,
    writeContractAsync,
    isPending: isLoading,
  } = useWriteContract()

  const { refetch: refetchFee } = useReadContract(
    estimateBridgeFee(
      fields.chainTo,
      address!,
      BigInt(fields.tokenId),
      selectedChainId,
    ),
  )

  const { refetch: refetchUserNFTIds } = useReadContract(
    getUserNFTIds(address!, selectedChainId),
  )

  const { refetch: refetchModernUserNFTIds } = useReadContract(
    getModernUserNFTIds(address!, selectedChainId),
  )

  const refetchNFT = async () => {
    setIsLoadingNFT(true)
    const nfts = await getNFTBalance(address!, selectedChainId)
    setIsLoadingNFT(false)
    return nfts
  }

  async function bridgeNFT({ chainTo, tokenId }: z.infer<typeof BridgeSchema>) {
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
      ...bridge(selectedChainId),
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
                    <Popover
                      open={popoverFromOpen}
                      onOpenChange={setPopoverFromOpen}
                    >
                      <ChainyTrigger
                        disabled={isLoading}
                        selectedValue={field.value}
                      />
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
                  </FormItem>
                )}
              />

              <RepeatButton
                onClick={() => {
                  form.setValue('chainFrom', fields.chainTo)
                  form.setValue('chainTo', fields.chainFrom)
                  ref.current = Date.now().toString()

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
                    <FormLabel>Transfer to</FormLabel>
                    <Popover
                      open={popoverToOpen}
                      onOpenChange={setPopoverToOpen}
                    >
                      <ChainyTrigger
                        disabled={isLoading}
                        selectedValue={field.value}
                      />
                      <ChainList
                        isChainGridView={isChainGridView}
                        setIsChainGridView={setIsChainGridView}
                        disabledChain={165}
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
              loading={isLoading || isLoadingNFT}
            >
              {isLoadingNFT ? 'Loading NFT...' : 'Bridge'}
            </SubmitButton>

            <a href="https://layerzero.network/" rel="noreferrer">
              <LayerZero className="text-center w-full mt-10" />
            </a>
          </form>
        </Form>
      </Paper>
      <BridgedDialog
        hash={bridgingData}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={selectedChainId}
        chainTo={fields.chainTo}
      />
    </>
  )
}
