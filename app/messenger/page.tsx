'use client'

import { CHAINS } from '@/app/_utils/chains'
import { MessengerSchema } from '@/app/_utils/schemas'
import { InfoHover } from '@/app/token/_components/info-hover'
import { Button } from '@/components/ui/button-new'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount, useSwitchChain } from 'wagmi'
import { z } from 'zod'
import {
  ChainList,
  ChainyTrigger,
  RepeatButton,
} from '../_components/chainy/chains-popover'
import { Paper } from '../_components/chainy/chains-popover'

export default function MessengerPage() {
  const { chain, status } = useAccount()
  const { switchChain } = useSwitchChain()
  const [popoverFromOpen, setPopoverFromOpen] = useState(false)
  const [isChainGridView, setIsChainGridView] = useState(false)
  const [popoverToOpen, setPopoverToOpen] = useState(false)

  // const selectedChainId = chain?.id ?? 0

  const form = useForm<z.infer<typeof MessengerSchema>>({
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

  async function handleSendMessage({
    recipient,
    message,
  }: z.infer<typeof MessengerSchema>) {
    console.log(recipient, message)
  }

  return (
    <Paper title="MESSENGER">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSendMessage)}>
          <div className="w-full flex justify-between items-center md:mb-5 mb-7 gap-5 md:gap-0 md:flex-row flex-col">
            <FormField
              control={form.control}
              name="chainFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-end justify-between">
                    Send from
                  </FormLabel>
                  <FormControl>
                    <Popover
                      open={popoverFromOpen}
                      onOpenChange={setPopoverFromOpen}
                    >
                      <ChainyTrigger selectedValue={field.value} />
                      <ChainList
                        isChainGridView={isChainGridView}
                        setIsChainGridView={setIsChainGridView}
                        selectedValue={fields.chainTo}
                        fieldValue={field.value}
                        onSelect={(value, chainId) => {
                          form.setValue('chainFrom', value)
                          setPopoverFromOpen(false)
                          if (chainId !== chain?.id) switchChain({ chainId })
                        }}
                      />
                    </Popover>
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
                  switchChain({ chainId: selectedChain?.chainId })
              }}
            />

            <FormField
              control={form.control}
              name="chainTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send to</FormLabel>
                  <Popover open={popoverToOpen} onOpenChange={setPopoverToOpen}>
                    <ChainyTrigger selectedValue={field.value} />
                    <ChainList
                      isChainGridView={isChainGridView}
                      setIsChainGridView={setIsChainGridView}
                      selectedValue={fields.chainFrom}
                      fieldValue={field.value}
                      onSelect={(value) => {
                        form.setValue('chainTo', value)
                        setPopoverToOpen(false)
                      }}
                    />
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <Label className="leading-10 flex items-center">
            Recipient address
            <InfoHover desc="Message recipient address (0x...)" />
          </Label>
          <Input
            type="text"
            autoComplete="off"
            placeholder="Message recipient address."
            {...register('recipient')}
          />

          <Label className="leading-10 mt-4 flex items-center">
            Message content
            <InfoHover desc="Message body. Maximum 1000, minimum 10 symbols." />
          </Label>
          <Textarea
            autoComplete="off"
            placeholder="Type your message here."
            {...register('message')}
          />

          <Button
            className="w-full mt-5 hover:scale-[1.05]"
            type="submit"
            disabled={!isValid}
            loading={status !== 'connected'}
          >
            {status === 'disconnected' ? 'CONNECT WALLET' : 'SEND MESSAGE'}
          </Button>
        </form>
      </Form>
    </Paper>
  )
}
