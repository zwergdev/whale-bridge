'use client'
import { estimateFees } from '@/app/gas-station/_contracts/index'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Popover } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useAccount, useSwitchChain } from 'wagmi'
import { z } from 'zod'
import { ChainList, ChainyTrigger } from '../_components/chainy/chains-popover'
import { SubmitButton } from '../_components/submit-button'
import { CHAINS } from '../_utils/chains'
import { GasStationSchema } from '../_utils/schemas'
import { GasAmount } from './_components/gas-amount'
import { PaperGasStation } from './_components/paper-gas-station'
import {
  PaperAmount,
  PaperSelectedChain,
} from './_components/papers-information'

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

  const getSelected = () => {
    const selected = watch('selectedChains')

    if (selected.length === 0) return {}

    return selected
      .filter((chain) => chain.amount)
      .map((chain) => ({
        v2Value: CHAINS.find((cc) => cc.value === chain.chainId)?.v2Value,
        chainId: chain.chainId,
        valueInEther: String(chain.amount),
      }))
      .reduce((obj: any, item) => {
        obj[item.chainId] = item
        return obj
      }, {})
  }

  const { fee } = estimateFees(chain?.id ?? 0, getSelected())

  console.log(fee)

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
