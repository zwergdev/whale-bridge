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
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { useContractWrite } from 'wagmi'
import { arbitrumBridgeABI } from '@/app/mint/abi'
import { parseEther } from 'viem/utils'

const CHAINS = [
  { label: 'BNB', value: 'bnb', image: '/bnb.svg' },
  { label: 'Arbitrum Nova', value: 'arb-nova', image: '/bnb.svg' },
  { label: 'Polygon', value: 'polygon', image: '/bnb.svg' },
] as const

const FormSchema = z.object({
  chainFrom: z.string({
    required_error: 'Please select a chain.',
  }),
  chainTo: z.string({
    required_error: 'Please select a chain.',
  }),
})

export default function MintPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chainFrom: 'arb-nova',
      chainTo: 'polygon',
    },
  })
  const { watch, setValue } = form

  const fields = watch()

  const { isSuccess, write } = useContractWrite({
    address: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
    abi: arbitrumBridgeABI,
    functionName: 'mint',
    chainId: 42170,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    write({
      value: parseEther('0'),
    })
    if (isSuccess)
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
  }

  return (
    <section className="border text-sm text-foreground rounded-md border-border max-w-xl w-full px-4 pt-3 pb-4 bg-background/60 backdrop-blur-xl flex flex-col">
      <h2 className="font-bold text-lg mb-6">Mint & Bridge</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex justify-between items-center mt-4 mb-10">
            <FormField
              control={form.control}
              name="chainFrom"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? CHAINS.find(({ value }) => value === field.value)
                                ?.label
                            : 'Select chain'}
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
                setValue('chainFrom', fields.chainTo)
                setValue('chainTo', fields.chainFrom)
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
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? CHAINS.find(({ value }) => value === field.value)
                                ?.label
                            : 'Select chain'}
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

          <p className="mb-1">Mint NFT</p>
          <Button className="mb-4 w-full">Mint</Button>

          <p className="mb-1">Bridge</p>
          <Button type="submit" disabled className="w-full">
            Bridge
          </Button>
        </form>
      </Form>
    </section>
  )
}
