'use client'
import { Popover } from '@/components/ui/popover'
import { ChainyTrigger } from '../_components/chainy/chains-popover'
import { useState } from 'react'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GasStationSchema } from '../_utils/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CHAINS } from '../_utils/chains'
import { useAccount, useSwitchChain } from 'wagmi'
import {
  PaperAmount,
  PaperSelectedChain,
} from './_components/papers-information'
import { SubmitButton } from '../_components/submit-button'
import { PaperGasStation } from './_components/paper-gas-station'
import { ChainListGas } from './_components/chain-popover-gas-station'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function GasStationPage() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isChainGridView, setIsChainGridView] = useState(false)
  const { switchChain } = useSwitchChain()
  const { chain } = useAccount()

  const form = useForm<z.infer<typeof GasStationSchema>>({
    resolver: zodResolver(GasStationSchema),
    defaultValues: {
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175,
      selectChain: [],
    },
  })

  const { watch, setValue } = form

  console.log(watch('selectChain'))

  return (
    <section className="w-full max-w-screen-xl min-h-[calc(100vh-150px)] flex flex-col justify-center">
      <h1 className="text-4xl">Gas Station</h1>
      <Form {...form}>
        <form className="flex w-full">
          <div className="flex w-full gap-5">
            <PaperGasStation width="w-[400px]">
              <FormField
                control={form.control}
                name="chainFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-end">
                      Source Chain
                    </FormLabel>
                    <Popover
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <ChainyTrigger selectedValue={field.value} />
                      <ChainListGas
                        isChainGridView={isChainGridView}
                        setIsChainGridView={setIsChainGridView}
                        selectedValue={field.value}
                        fieldValue={field.value}
                        onSelect={(value, chainId) => {
                          setValue('chainFrom', value)
                          setIsPopoverOpen(false)
                          if (chainId !== chain?.id) switchChain({ chainId })
                        }}
                      />
                    </Popover>
                  </FormItem>
                )}
              />
              <PaperSelectedChain selectedChain={watch('selectChain')} />
              <PaperAmount totalAmount={0} />
              <SubmitButton disabled={false} loading={false}>
                Gas
              </SubmitButton>
            </PaperGasStation>
            <PaperGasStation width="w-9/12">
              <FormField
                control={form.control}
                name="selectChain"
                render={({ field }) => (
                  <FormItem>
                    <ScrollArea className="h-96">
                      <div className="w-full h-auto flex flex-col gap-4 px-5 pt-3">
                        {CHAINS.map(({ label, image, value }, index) => (
                          <>
                            <div
                              className="flex w-full justify-between items-center"
                              key={index}
                            >
                              <div className="w-max flex items-center">
                                <Checkbox
                                  checked={
                                    !!watch('selectChain').find(
                                      ({ chain }) => chain === value,
                                    )
                                  }
                                  onCheckedChange={() => {
                                    if (
                                      !watch('selectChain').find(
                                        ({ chain }) => chain === value,
                                      )
                                    ) {
                                      return setValue('selectChain', [
                                        ...watch('selectChain'),
                                        {
                                          chain: value,
                                        },
                                      ])
                                    }
                                    if (
                                      watch('selectChain').find(
                                        ({ chain }) => chain === value,
                                      )
                                    ) {
                                      return setValue('selectChain', [
                                        ...watch('selectChain').filter(
                                          ({ chain }) => chain !== value,
                                        ),
                                      ])
                                    }
                                  }}
                                />
                                <Image
                                  src={image}
                                  width={35}
                                  height={35}
                                  alt="chain-image"
                                  className="rounded-full mx-2"
                                />
                                <span className="text-lg">{label}</span>
                              </div>
                              <div className="flex items-center">
                                <Input
                                  className="h-3 max-w-36 mr-3"
                                  placeholder="Amount"
                                  type='number'
                                />
                                <Button size="sm">MAX</Button>
                              </div>
                            </div>
                            <Separator />
                          </>
                        ))}
                      </div>
                    </ScrollArea>
                  </FormItem>
                )}
              />
            </PaperGasStation>
          </div>
        </form>
      </Form>
    </section>
  )
}
