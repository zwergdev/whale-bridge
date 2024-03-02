'use client'

import {
  ChainList,
  RepeatButton,
} from '@/app/_components/chainy/chains-popover'
import { CHAINS } from '@/app/_utils/chains'
import { MessengerForm, MessengerSchema } from '@/app/_utils/schemas'
import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import { InfoHover } from '@/app/token/_components/info-hover'
import { Button } from '@/components/ui/button-new'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Paper } from '@/components/ui/paper'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parseEther } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'
import { useWriteContract } from '../_hooks'
import { AddressNetwork } from './_components/address-network'
import { MessengerDialog } from './_components/messenger-dialog'
import {
  getMessageDestination,
  sendMessageOpts,
} from './_contracts/messenger-contracts'
import { useEstimateRefuelFee } from './_hooks/actions'
import { useCheckChainTo } from '../_hooks/checkChainTo'

export default function MessengerPage() {
  const { switchChain } = useSwitchChain()
  const { chain, status, address } = useAccount()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)
  const [isChainGridView, setIsChainGridView] = useState(false)

  const selectedChainId = chain?.id ?? 0

  useEffect(() => {
    form.setValue(
      'chainFrom',
      CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175,
    )
    useCheckChainTo({ setValue: form.setValue, watch, chain: chain?.id })
  }, [chain])

  const form = useForm<MessengerForm>({
    resolver: zodResolver(MessengerSchema),
    defaultValues: {
      message: 'Wow, Whale Messenger is cool! 🐋',
      chainFrom:
        CHAINS.find(({ chainId }) => chainId === chain?.id)?.value ?? 175, // 175
      chainTo: CHAINS.filter(({ chainId }) => chainId !== chain?.id)[3].value, // 102
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
    if (isDisabledChainUsed)
      return truncatedToaster('Ooops...', 'This chain is temporary disabled.')
    if (chainFrom === 126)
      return truncatedToaster('Ooops...', 'This chain is temporary disabled.')
    // @TODO: remove later logic above

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
            <div className="w-full flex flex-col justify-between items-center md:mb-5 mb-7 gap-3">
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
                onClick={() => {
                  form.setValue('chainFrom', fields.chainTo)
                  form.setValue('chainTo', fields.chainFrom)

                  const selectedChain = CHAINS.find(
                    ({ value }) => value === fields.chainTo,
                  )

                  if (selectedChain?.chainId)
                    switchChain({ chainId: selectedChain.chainId })
                }}
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

            <Label className="leading-10 mt-4 flex items-center">
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
      <MessengerDialog
        hash={hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={selectedChainId}
        chainTo={fields.chainTo}
      />
    </>
  )
}
