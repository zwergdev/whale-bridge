'use client'

import { RepeatButton } from '@/app/_components/chainy/chains-popover'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronsUpDown, Loader } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
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
  getUserNFTIds,
} from '../_utils/contract-actions'
import { getNFTBalance } from '../_utils/nftBalance'
import { BridgeSchema } from '../_utils/schemas'
import { truncatedToaster } from '../_utils/truncatedToaster'
import { BridgedDialog } from './_components/bridged-dialog'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default function BridgePage() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoadingNFT, setIsLoadingNFT] = useState(true)
  const ref = useRef('a')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let active = true
    ;(async () => {
      setIsLoadingNFT(true)
      await delay(3000)

      const recursiveFunction = async (attempt = 0): Promise<any[]> => {
        if (chain?.id === 42220 || chain?.id === 1101) {
          const { data: nfts }: any = await refetchUserNFTIds()
          return nfts.map((nft: any) => nft.toString())
        }

        const maxAttempts = chain?.id === 137 ? 9 : 6
        if (attempt >= maxAttempts || !active) return []

        const nfts = await getNFTBalance(address!, chain?.id ?? 0)

        if (nfts.length === 0) {
          await delay(chain?.id === 137 ? 4000 : 3000)
          return recursiveFunction(attempt + 1)
        }

        return nfts
      }

      const nfts = await recursiveFunction()

      if (active) {
        form.setValue('tokenId', nfts?.[0] ?? '0')
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
    writeAsync,
    isLoading,
  } = bridge(chain?.unsupported ? 0 : chain?.id ?? 0)

  const { refetch: refetchFee } = estimateBridgeFee(
    fields.chainTo,
    address!,
    BigInt(fields.tokenId),
    chain?.unsupported ? 0 : chain?.id ?? 0,
  )

  const { refetch: refetchUserNFTIds } = getUserNFTIds(address!, chain?.id ?? 0)

  const refetchNFT = async () => {
    setIsLoadingNFT(true)
    const nfts = await getNFTBalance(address!, chain?.id ?? 0)
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

      tokenId = nfts[0]
    }

    const { data: fee }: any = await refetchFee()

    if (!fee)
      return truncatedToaster('Error occurred!', 'Failed to fetch refuel cost.')

    await writeAsync({
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
    form.setValue('tokenId', newNFTs[0] ?? '0')
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
                        <>
                          <p className="mx-2 text-xl">No NFTs found!</p>
                          <Button
                            type="button"
                            className="w-full text-sm py-2 mt-2"
                            onClick={async () => {
                              const nfts = await refetchNFT()
                              form.setValue('nfts', nfts ?? [])
                            }}
                          >
                            Retry
                          </Button>
                        </>
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
                  ref.current = Date.now().toString()

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
              {isLoadingNFT
                ? chain?.id === 137
                  ? 'Loading NFT... [40 sec]'
                  : 'Loading NFT...'
                : 'Bridge'}
            </SubmitButton>

            <Link href="https://layerzero.network/" target="_blank">
              <LayerZero className="text-center w-full mt-10" />
            </Link>
          </form>
        </Form>
      </Paper>
      <BridgedDialog
        hash={bridgingData?.hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={chain?.id ?? 0}
        chainTo={fields.chainTo}
      />
    </>
  )
}
