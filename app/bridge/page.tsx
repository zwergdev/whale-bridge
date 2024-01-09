'use client'

import { Button } from '@/components/ui/button'
import { Repeat2, ChevronDown, Settings } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { CHAINS, selectedChain } from '@/app/_utils/chains'
import { LayerZero } from '@/components/ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAccount, useNetwork } from 'wagmi'
import { BridgeSchema } from '@/app/_utils/schemas'
import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import { estimateFee, bridge } from '@/app/_utils/contract-actions'
import { Paper } from '../_components/paper'
import { SubmitButton } from '../_components/submit-button'
import { getNFTBalance } from '../_utils/nftBalance'
import { useEffect, useState } from 'react'

export default function BridgePage() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const [tokenId, setTokenId] = useState<bigint>(BigInt(0))

  useEffect(() => {
    ;(async () => {
      const nfts = await getNFTBalance(address!, chain?.id ?? 0)
      setTokenId(BigInt(nfts?.[0] ?? 0))
    })()
  }, [address, chain])

  const form = useForm<z.infer<typeof BridgeSchema>>({
    resolver: zodResolver(BridgeSchema),
    defaultValues: {
      chainFrom: 175,
      chainTo: 102,
    },
  })
  const {
    watch,
    formState: { isValid },
  } = form

  const fields = watch()

  const { write, isLoading } = bridge(chain?.id ?? 0)

  const { refetch: refetchFee, error: feeError } = estimateFee(
    fields.chainTo,
    address!,
    tokenId,
    chain?.id ?? 0,
  )

  async function bridgeNFT({ chainTo }: z.infer<typeof BridgeSchema>) {
    if (tokenId === BigInt(0))
      return truncatedToaster('Error occurred!', 'No NFTs found!')

    const { data: fee } = await refetchFee()

    console.log(fee)

    if (!fee) return truncatedToaster('Error occurred!', feeError?.message!)

    write({
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
  }

  return (
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isLoading}
                          role="combobox"
                          variant="clean"
                          className="flex justify-between md:w-80 w-60 pl-3 md:pr-5 pr-2 bg-popover"
                        >
                          {selectedChain(field.value)}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
                      <Command>
                        <CommandInput placeholder="Search chain..." />
                        <CommandEmpty>No chain found.</CommandEmpty>
                        <CommandGroup>
                          {CHAINS.map(({ label, value, image }) => (
                            <CommandItem
                              value={label}
                              key={value}
                              image={image}
                              disabled={fields.chainTo === value}
                              checked={value === field.value}
                              onSelect={() => {
                                form.setValue('chainFrom', value)
                              }}
                            >
                              {label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <Repeat2
              className="stroke-foreground cursor-pointer opacity-75 hover:opacity-100 duration-300 transition-opacity relative md:top-3 top-1"
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isLoading}
                          role="combobox"
                          variant="clean"
                          className="flex justify-between md:w-80 w-60 pl-3 md:pr-5 pr-2 bg-popover"
                        >
                          {selectedChain(field.value)}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0">
                      <Command>
                        <CommandInput placeholder="Search chain..." />
                        <CommandEmpty>No chain found.</CommandEmpty>
                        <CommandGroup>
                          {CHAINS.map(({ label, value, image }) => (
                            <CommandItem
                              value={label}
                              key={value}
                              image={image}
                              disabled={fields.chainFrom === value}
                              checked={value === field.value}
                              onSelect={() => {
                                form.setValue('chainTo', value)
                              }}
                            >
                              {label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <SubmitButton
            disabled={!isValid || isLoading}
            chainFrom={fields.chainFrom}
          >
            Bridge
          </SubmitButton>

          <LayerZero className="text-center w-full mt-10" />
        </form>
      </Form>
    </Paper>
  )
}
