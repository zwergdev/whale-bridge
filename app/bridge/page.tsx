'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Popover } from '@/components/ui/popover'
import { CHAINS } from '../_utils/chains'
import { LayerZero } from '@/components/ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { BridgeSchema } from '../_utils/schemas'
import { truncatedToaster } from '../_utils/truncatedToaster'
import { estimateBridgeFee, bridge } from '../_utils/contract-actions'
import { SubmitButton } from '../_components/submit-button'
import { getNFTBalance } from '../_utils/nftBalance'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ChainList,
  ChainyTrigger,
  Paper,
} from '../_components/chainy/chains-popover'
import { RepeatButton } from '@/app/_components/chainy/chains-popover'
import { BridgedDialog } from './_components/bridged-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { ChevronsUpDown, Loader } from 'lucide-react'

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
    ;(async () => {
      setIsLoadingNFT(true)
      await delay(2500)
      const nfts = await getNFTBalance(address!, chain?.id ?? 0)
      form.setValue('tokenId', nfts?.[0] ?? '0')
      form.setValue('nfts', nfts ?? [])
      setIsLoadingNFT(false)
    })()
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

  async function bridgeNFT({ chainTo, tokenId }: z.infer<typeof BridgeSchema>) {
    if (tokenId === '0') {
      setIsLoadingNFT(true)
      const nfts = await getNFTBalance(address!, chain?.id ?? 0)
      setIsLoadingNFT(false)

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
                      <SelectTrigger className="flex items-center justify-center gap-2">
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

            <SubmitButton
              disabled={!isValid}
              loading={isLoading || isLoadingNFT}
            >
              {isLoadingNFT ? 'Loading NFT...' : 'Bridge'}
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
