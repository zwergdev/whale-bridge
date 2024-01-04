'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { RefuelSchema } from '@/app/_utils/schemas'
import { Button } from '@/components/ui/button'
import { Repeat2, Check, ChevronsUpDown } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { CHAINS } from '@/app/_utils/chains'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Slider } from '@/components/ui/slider'

export default function RefuelPage() {
  const { address } = useAccount()

  const [isLoading] = useState(false)
  const form = useForm<z.infer<typeof RefuelSchema>>({
    resolver: zodResolver(RefuelSchema),
    defaultValues: {
      chainFrom: 42170,
      chainTo: 102,
    },
  })

  const {
    watch,
    formState: { isValid },
  } = form

  const fields = watch()

  function refuel(data: z.infer<typeof RefuelSchema>) {
    console.log(data)
  }

  return (
    <section className="border text-sm text-foreground rounded-md border-border max-w-xl w-full px-4 pt-3 pb-4 bg-background/60 backdrop-blur-xl flex flex-col">
      <h2 className="font-bold text-lg mb-6">Refuel Gas</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(refuel)}>
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

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-end justify-between">
                  Refuel Amount
                  <button
                    type="button"
                    className="text-[10px] opacity-75 text-primary duration-200 transition-opacity mr-1 hover:opacity-100 leading-[0.4]"
                  >
                    MAX
                  </button>
                </FormLabel>
                <FormControl>
                  <Input placeholder="0.000 ETH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between w-full my-7 gap-4 text-xs">
            <span className="flex items-center justify-center bg-background rounded-md py-1 w-16 border border-border">
              0
            </span>
            <Slider defaultValue={[33]} max={100} step={1} />
            <span className="flex items-center justify-center bg-background rounded-md py-1 w-16 border border-border">
              123
            </span>
          </div>

          <article className="bg-background/50 border border-border rounded-md px-3 py-2 mb-6">
            <h3 className="font-bold text-lg mb-3">Transaction Summary</h3>

            <div className="flex items-center justify-between w-full">
              Estimated Transfer Time:
              <span className="text-secondary tracking-wide">~5 mins</span>
            </div>
            <div className="flex items-center justify-between w-full">
              Refuel cost:
              <span className="text-secondary tracking-wide">
                0.00015 ETH ($0.34)
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              Expected Output:
              <span className="text-secondary tracking-wide">0 MATIC ($0)</span>
            </div>
          </article>

          <Button
            type="submit"
            disabled={!isValid || !address || isLoading}
            className="w-full"
          >
            Refuel
          </Button>
        </form>
      </Form>
    </section>
  )
}
