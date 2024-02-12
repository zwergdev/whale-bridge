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
import { PaperAmount } from './_components/paper-amount'
import { SubmitButton } from '../_components/submit-button'

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
    },
  })
  // const { watch } = form
  // const fields = watch()

  return (
    <section className="w-full max-w-screen-xl min-h-[calc(100vh-150px)] flex flex-col justify-center">
      <h1 className="text-4xl">Gas Station</h1>
      <Form {...form}>
        <form className="flex w-full">
          <div className="flex w-full gap-5">
            <div className="gap-5 text-sm text-foreground rounded-md border-popover border overflow-hidden w-max p-6 relative bg-[#011e37]/30 backdrop-blur-md flex flex-col">
              <div className="w-20 h-32 -z-10 bg-primary blur-[150px] absolute -bottom-20 left-0" />
              <div className="w-20 h-32 -z-10 bg-primary blur-[200px] absolute -top-20 right-20" />
              <FormField
                control={form.control}
                name="chainFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-end justify-between">
                      Source Chain
                    </FormLabel>
                    <Popover
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <ChainyTrigger selectedValue={field.value} />
                      <ChainList
                        isChainGridView={isChainGridView}
                        setIsChainGridView={setIsChainGridView}
                        // MOCK
                        selectedValue={202}
                        fieldValue={field.value}
                        onSelect={(value, chainId) => {
                          form.setValue('chainFrom', value)
                          setIsPopoverOpen(false)
                          if (chainId !== chain?.id) switchChain({ chainId })
                        }}
                      />
                    </Popover>
                  </FormItem>
                )}
              />
              <PaperAmount totalAmount={0} />
              <SubmitButton disabled={false} loading={false}>
                Gas
              </SubmitButton>
            </div>
            <div className="text-sm text-foreground rounded-md border-popover border overflow-hidden w-3/5 p-6 relative bg-[#011e37]/30 backdrop-blur-md flex flex-col">
              <div className="w-36 h-32 -z-10 bg-primary blur-[150px] absolute -bottom-20 left-0" />
              <div className="w-26 h-32 -z-10 bg-primary blur-[200px] absolute -top-20 right-20" />
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}
