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
import { PaperAmount, PaperSelectedChain } from './_components/papers-information'
import { SubmitButton } from '../_components/submit-button'
import { PaperGasStation } from './_components/paper-gas-station'
import { ChainListGas } from './_components/chain-popover-gas-station'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'
import Image from 'next/image'

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

  return (
    <section className="w-full max-w-screen-xl min-h-[calc(100vh-150px)] flex flex-col justify-center">
      <h1 className="text-4xl">Gas Station</h1>
      <Form {...form}>
        <form className="flex w-full">
          <div className="flex w-full gap-5">
            <PaperGasStation>
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
            <PaperGasStation width="w-1/2">
              <FormField
                control={form.control}
                name="selectChain"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select open={true}>
                      <SelectTrigger className="w-full text-2xl text-white text-start">
                        Out Bound Chain
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {CHAINS.map(({ label, image, value }, index) => (
                          <SelectItem
                            key={index}
                            value={label}
                            className="w-full"
                            onClick={() => {
                              if(!watch('selectChain').includes(value)){
                              return setValue('selectChain', [
                                ...watch('selectChain'),
                                value,
                              ])
                            }
                              setValue('selectChain', [
                                ...watch('selectChain').filter((v) => v !== value)
                              ])
                            }}
                          >
                            <div className="flex w-full justify-between items-center">
                              <Image
                                src={image}
                                width={30}
                                height={30}
                                alt="chain-image"
                                className="rounded-full mr-2"
                              />
                              <span>{label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
