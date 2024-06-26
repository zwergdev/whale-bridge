'use client'

import { ChainList, RepeatButton, TransactionDialog } from '@/app/_components'
import { CHAINS } from '@/lib/constants/chains'
import { MessengerForm, MessengerSchema, truncatedToaster } from '@/app/_utils'
import { InfoHover } from '@/app/_components/info-hover'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Textarea,
  Button,
  Label,
  Paper,
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parseEther } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'
import {
  useWriteContract,
  useCheckChainTo,
  useSetChainFrom,
  useCustomSwitchChain,
} from '@/app/_hooks'
import { AddressNetwork } from './_components'
import {
  getMessageDestination,
  sendMessageOpts,
} from './_contracts/messenger-contracts'
import { useEstimateRefuelFee } from './_hooks/actions'

export default function MessengerPage() {
  const { switchChain } = useSwitchChain()
  const { chain, status, address } = useAccount()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const [isChainGridView, setIsChainGridView] = useState(false)

  const selectedChainId = chain?.id ?? 0

  useEffect(() => {
    form.setValue('chainFrom', useSetChainFrom({ chain: chain?.id }))
    form.setValue('chainTo', useCheckChainTo({ watch, chain: chain?.id })!)
  }, [chain])

  const form = useForm<MessengerForm>({
    resolver: zodResolver(MessengerSchema),
    defaultValues: {
      message: 'Wow, Whale Messenger is cool! 🐋',
      chainFrom: useSetChainFrom({ chain: chain?.id }), // 175
      chainTo: useCheckChainTo({ chain: chain?.id })!, // 102
    },
  })
  const {
    watch,
    register,
    formState: { isValid },
  } = form
  const fields = watch()

  const { refetchFee } = useEstimateRefuelFee(
    fields.chainTo,
    selectedChainId,
    fields.message,
  )

  const { writeContractAsync, isPending, data: hash } = useWriteContract()

  async function onMessageSend({ message, chainTo, chainFrom }: MessengerForm) {
    const isDisabledChainUsed = [150].some(
      (id) => id === chainFrom || id === chainTo,
    )
    if (isDisabledChainUsed || chainFrom === 126)
      return truncatedToaster('Ooops...', 'This chain is temporary disabled.')

    const { data: fee }: any = await refetchFee()

    if (!fee)
      return truncatedToaster(
        'Error occurred!',
        'Failed to fetch message cost.',
      )

    const opts = sendMessageOpts(selectedChainId)

    const dstChain = CHAINS.find(({ value }) => value === chainTo)?.chainId

    const value: bigint = parseEther(opts.price) + fee[0]

    await writeContractAsync({
      ...opts,
      address: opts.address!,
      value,
      args: [
        message,
        chainTo,
        getMessageDestination(dstChain!, selectedChainId),
      ],
    })

    setIsDialogOpen(true)
    form.setValue('message', '')
  }

  return (
    <>
      <Paper title="MESSENGER">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onMessageSend)}>
            <div className="flex-container-between-col md:mb-5 mb-7 gap-3">
              <FormField
                control={form.control}
                name="chainFrom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <AddressNetwork
                        address={address}
                        label="From"
                        fieldValue={fields.chainFrom}
                        open={popoverFromOpen}
                        onOpenChange={setPopoverFromOpen}
                      >
                        <ChainList
                          isChainGridView={isChainGridView}
                          setIsChainGridView={setIsChainGridView}
                          disabledChains={[150, 126, 126]}
                          selectedValue={fields.chainTo}
                          fieldValue={field.value}
                          isPopoverFROM={true}
                          onSelect={(value, chainId) => {
                            form.setValue('chainFrom', value)
                            setPopoverFromOpen(false)
                            if (chainId !== chain?.id) switchChain({ chainId })
                          }}
                        />
                      </AddressNetwork>
                    </FormControl>
                  </FormItem>
                )}
              />

              <RepeatButton
                onClick={() =>
                  useCustomSwitchChain({
                    switchChain(chainId) {
                      switchChain({ chainId })
                    },
                    setValue: form.setValue,
                    chainFrom: fields.chainFrom,
                    chainTo: fields.chainTo,
                  })
                }
              />

              <FormField
                control={form.control}
                name="chainTo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <AddressNetwork
                        address={address}
                        label="To"
                        info="Dynamic recepients will be available soon."
                        fieldValue={fields.chainTo}
                        open={popoverToOpen}
                        onOpenChange={setPopoverToOpen}
                      >
                        <ChainList
                          isChainGridView={isChainGridView}
                          setIsChainGridView={setIsChainGridView}
                          selectedValue={fields.chainFrom}
                          disabledChains={[150, 165, 111, 110, 126]}
                          fieldValue={field.value}
                          onSelect={(value) => {
                            form.setValue('chainTo', value)
                            setPopoverToOpen(false)
                          }}
                        />
                      </AddressNetwork>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Label className="leading-10 mt-4 flex-center">
              Message content
              <InfoHover
                desc="Message body. Maximum 140, minimum 1 symbols."
                align="start"
              />
            </Label>
            <Textarea
              autoComplete="off"
              placeholder="Type your message here."
              {...register('message')}
            />

            <Button
              className="w-full mt-5 hover:scale-[1.05]"
              type="submit"
              disabled={!isValid || status === 'disconnected'}
              loading={
                status === 'connecting' ||
                status === 'reconnecting' ||
                isPending
              }
            >
              {status === 'disconnected' ? 'CONNECT WALLET' : 'SEND MESSAGE'}
            </Button>
          </form>
        </Form>
      </Paper>
      <TransactionDialog
        hash={hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={selectedChainId}
        chainTo={fields.chainTo}
      />
    </>
  )
}
