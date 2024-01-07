import { Button } from '@/components/ui/button'
import { Repeat2, Check, ChevronDown } from 'lucide-react'
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
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import Image from 'next/image'
import { CHAINS, selectedChain } from '@/app/_utils/chains'
import { LayerZero } from '@/components/ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAccount, useNetwork } from 'wagmi'
import { BridgeSchema } from '@/app/_utils/schemas'
import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import { estimateFee, bridge } from '@/app/_utils/contract-actions'

export const BridgePage = () => {
  const { address } = useAccount()
  const { chain } = useNetwork()

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

  // @TODO Change this to a dynamic value
  const tokenId = BigInt(521)

  const { refetch, error } = estimateFee(
    fields.chainTo,
    address!,
    tokenId,
    chain?.id ?? 0,
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
        tokenId,
        address!,
        '0x0000000000000000000000000000000000000000',
        '0x00010000000000000000000000000000000000000000000000000000000000030d40',
      ],
    })
  }

  return (
    <section className="text-sm text-foreground rounded-md max-w-screen-md w-full px-6 pt-8 pb-12 bg-[#011D36] flex flex-col">
      <h2 className="font-semibold text-2xl mb-5">NFT BRIDGE</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(bridgeNFT)}>
          <div className="w-full flex justify-between items-center mb-16">
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
                          className="flex justify-between w-80 pl-3 pr-5 bg-popover"
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
              className="stroke-foreground cursor-pointer opacity-75 hover:opacity-100 duration-300 transition-opacity relative top-3"
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
                          className="flex justify-between w-80 pl-3 pr-5 bg-popover"
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

          <Button
            type="submit"
            disabled={!isValid || !address || isLoading}
            className="w-full mb-10 text-base py-2.5"
          >
            Bridge
          </Button>
          <LayerZero className="text-center w-full" />
        </form>
      </Form>
    </section>
  )
}
