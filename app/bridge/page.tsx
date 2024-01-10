'use client'

import { Settings } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Popover } from '@/components/ui/popover'
import { CHAINS } from '../_utils/chains'
import { LayerZero } from '@/components/ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAccount, useNetwork } from 'wagmi'
import { BridgeSchema } from '../_utils/schemas'
import { truncatedToaster } from '../_utils/truncatedToaster'
import { estimateFee, bridge } from '../_utils/contract-actions'
import { SubmitButton } from '../_components/submit-button'
import { getNFTBalance } from '../_utils/nftBalance'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ChainList,
  ChainyTrigger,
  Paper,
} from '../_components/chainy/chains-popover'
import { RepeatButton } from '@/app/_components/chainy/chains-popover'
import { BridgedDialog } from './_components/bridged-dialog'

export default function BridgePage() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const [tokenId, setTokenId] = useState<bigint>(BigInt(0))
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      const nfts = await getNFTBalance(address!, chain?.id ?? 0)
      setTokenId(BigInt(nfts?.[0] ?? 0))
    })()
  }, [address, chain])

  const form = useForm<z.infer<typeof BridgeSchema>>({
    resolver: zodResolver(BridgeSchema),
    defaultValues: {
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175, // 175
      chainTo: CHAINS.filter(({ chainId }) => chainId !== chain?.id)[0].value, // 102
    },
  })
  const {
    watch,
    formState: { isValid },
  } = form

  const fields = watch()

  const { data: bridgingData, writeAsync, isLoading } = bridge(chain?.id ?? 0)

  const { refetch: refetchFee, error: feeError } = estimateFee(
    fields.chainTo,
    address!,
    tokenId,
    chain?.id ?? 0,
  )

  console.log(chain?.id)

  async function bridgeNFT({ chainTo }: z.infer<typeof BridgeSchema>) {
    if (tokenId === BigInt(0))
      return truncatedToaster('Error occurred!', 'No NFTs found!')

    const { data: fee } = await refetchFee()

    if (!fee) return truncatedToaster('Error occurred!', feeError?.message!)

    await writeAsync({
      value: fee[0],
      args: [
        address!,
        chainTo,
        address!,
        tokenId, // tokenId
        address!,
        '0x0000000000000000000000000000000000000000',
        '0x00010000000000000000000000000000000000000000000000000000000000030d40',
      ],
    })

    setIsDialogOpen(true)
  }

  return (
    <>
      <Paper title="NFT BRIDGE" icon={<Settings />}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(bridgeNFT)}>
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
                        onSelect={(value) => {
                          form.setValue('chainFrom', value)
                          setPopoverFromOpen(false)
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
              chainFrom={fields.chainFrom}
              loading={isLoading}
            >
              Bridge
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
      />
    </>
  )
}
