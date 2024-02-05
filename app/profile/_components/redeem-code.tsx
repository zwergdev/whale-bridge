'use client'

import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { utils } from 'ethers'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSignMessage } from 'wagmi'
import * as z from 'zod'
import { redeemCode } from '../actions'

const RedeemSchema = z.object({
  code: z
    .string()
    .max(20, { message: 'Code must contain at most 20 characters.' })
    .min(4, { message: 'Code must contain at least 4 characters.' }),
})

export const RedeemCode = () => {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof RedeemSchema>>({
    resolver: zodResolver(RedeemSchema),
    mode: 'onBlur',
  })
  const {
    formState: { isValid },
  } = form

  const {
    data: signature,
    signMessageAsync,
    isLoading,
  } = useSignMessage({
    onError: ({ message }) => truncatedToaster('Error!', message),
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    ;(async () => {
      if (signature) {
        const code = form.getValues('code')

        const messageToSign = `Redeemed code is ${code}`

        const signerAddress = utils.verifyMessage(messageToSign, signature)

        const isCodeValid = await redeemCode(signerAddress, code)

        if (!isCodeValid) return truncatedToaster('Error!', 'Invalid code.')

        queryClient.invalidateQueries({ queryKey: ['userData'] })
      }
    })()
  }, [signature])

  async function onSubmit({ code }: z.infer<typeof RedeemSchema>) {
    await signMessageAsync({ message: `Redeemed code is ${code}` })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[440px] w-full mx-auto flex items-center justify-items-start"
      >
        <div className="flex items-end justify-center gap-5">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Redeem code:</FormLabel>
                <Input {...field} autoComplete="off" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid} loading={isLoading}>
            Redeem
          </Button>
        </div>
      </form>
    </Form>
  )
}
