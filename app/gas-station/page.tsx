'use client'
import { Popover } from '@/components/ui/popover'
import { ChainList, ChainyTrigger } from '../_components/chainy/chains-popover'
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
import { toast } from 'sonner'
import { GasAmount } from './_components/gas-amount'

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
      selectedChains: [],
    },
  })

  const { watch, setValue } = form

  function onSubmit(data: z.infer<typeof GasStationSchema>) {
    toast('You submit this values:', {
      description: (
        <pre className="bg-paper p-4 ">
          <code className="text-white w-full">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    })
  }

  return (
    <>
      <section className="w-full max-w-screen-xl min-h-[calc(100vh-170px)] pt-32 flex flex-col justify-center">
        <h1 className="text-4xl font-semibold">Gas Station</h1>
        <Form {...form}>
          <form className="flex w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col max-lg:items-center h-max lg:flex-row w-full gap-5">
              <PaperGasStation width="w-full sm:w-[400px]">
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
                        <ChainList
                          isPopoverFROM={true}
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
                <PaperSelectedChain selectedChains={watch('selectedChains')} />
                <PaperAmount selectedChains={watch('selectedChains')} />
                <SubmitButton disabled={false} loading={false}>
                  Gas
                </SubmitButton>
              </PaperGasStation>
              <PaperGasStation width="w-full sm:w-9/12">
                <FormField
                  control={form.control}
                  name="selectedChains"
                  render={() => (
                    <GasAmount
                      setValue={setValue}
                      selectedChains={watch('selectedChains')}
                    />
                  )}
                />
              </PaperGasStation>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}
