'use client'

import { Button } from '@/components/ui/button'

import { Repeat2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { Separator } from '@/components/ui/separator'

import { MintButton } from '../_components/mint-button/mint-button'
import { Balance } from '../_components/balance'
import { CHAINS, selectedChain } from '../_utils/chains'
import { BridgeSchema } from '../_utils/schemas'
import { truncatedToaster } from '../_utils/truncatedToaster'
import {
  estimateFeeArbitrum,
  bridgeArbitrum,
} from '../_utils/contract-actions/arbitrum'

export default function MintPage() {
  const { address, status } = useAccount()

  const form = useForm<z.infer<typeof BridgeSchema>>({
    resolver: zodResolver(BridgeSchema),
    defaultValues: {
      balance: 0,
      chainFrom: 175,
      chainTo: 102,
    },
  })
  const {
    watch,
    formState: { isValid },
  } = form

  const fields = watch()

  const { write, isLoading } = bridgeArbitrum()

  const { refetch, error } = estimateFeeArbitrum(
    fields.chainTo,
    address!,
    BigInt(521), // tokenId
  )

  async function bridgeNFT({ chainTo }: z.infer<typeof BridgeSchema>) {
    const fee = await refetch()

    if (!fee?.data) return truncatedToaster('Error occurred!', error?.message!)

    write({
      value: fee.data[0],
      args: [
        address!,
        chainTo,
        address!,
        BigInt(521), // tokenId
        address!,
        '0x0000000000000000000000000000000000000000',
        '0x00010000000000000000000000000000000000000000000000000000000000030d40',
      ],
    })
  }

  return (
    <section className="border text-sm text-foreground rounded-md border-border max-w-xl w-full px-4 pt-3 pb-4 bg-background/60 backdrop-blur-xl flex flex-col">
      <h2 className="font-bold text-lg mb-6">NFT Bridge</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(bridgeNFT)}>
          <p className="mb-1">Mint NFT</p>

          <MintButton />

          <Balance
            address={address}
            status={status}
            onSuccess={(n) =>
              form.setValue('balance', n, { shouldValidate: true })
            }
          />

          <Separator className="my-5" />

          <div className="w-full flex justify-between items-center mt-4 mb-4">
            <FormField
              control={form.control}
              name="chainFrom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isLoading}
                          variant="outline"
                          role="combobox"
                          className="w-[200px] justify-between"
                        >
                          {selectedChain(field.value)}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search chain..." />
                        <CommandEmpty>No chain found.</CommandEmpty>
                        <CommandGroup>
                          {CHAINS.map(({ label, value, image }) => (
                            <CommandItem
                              value={label}
                              key={value}
                              disabled={fields.chainTo === value}
                              className={
                                fields.chainTo === value
                                  ? 'opacity-50 cursor-not-allowed'
                                  : ''
                              }
                              onSelect={() => {
                                form.setValue('chainFrom', value)
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={image}
                                  width={16}
                                  height={16}
                                  alt={`chain-${value}-icon`}
                                />
                                {label}
                              </div>

                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
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
              className="stroke-foreground cursor-pointer opacity-75 hover:opacity-100 duration-300 transition-opacity"
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isLoading}
                          variant="outline"
                          role="combobox"
                          className="w-[200px] justify-between"
                        >
                          {selectedChain(field.value)}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search chain..." />
                        <CommandEmpty>No chain found.</CommandEmpty>
                        <CommandGroup>
                          {CHAINS.map(({ label, value, image }) => (
                            <CommandItem
                              value={label}
                              key={value}
                              disabled={fields.chainFrom === value}
                              className={
                                fields.chainFrom === value
                                  ? 'opacity-50 cursor-not-allowed'
                                  : ''
                              }
                              onSelect={() => {
                                form.setValue('chainTo', value)
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={image}
                                  width={16}
                                  height={16}
                                  alt={`chain-${value}-icon`}
                                />
                                {label}
                              </div>

                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
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

          <p className="mb-1">Bridge</p>
          <Button
            type="submit"
            disabled={!isValid || !address || isLoading}
            className="w-full"
          >
            Bridge
          </Button>
        </form>
      </Form>
    </section>
  )
}
