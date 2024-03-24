'use client'

import { truncatedToaster } from '@/app/_utils/truncatedToaster'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount, useSignMessage, useVerifyMessage } from 'wagmi'
import * as z from 'zod'
import { redeemCode } from '../actions'

const RedeemSchema = z.object({
  code: z
    .string()
    .max(20, { message: 'Code must contain at most 20 characters.' })
    .min(4, { message: 'Code must contain at least 4 characters.' }),
})

export const RedeemCode = () => {
  const { address } = useAccount()
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
    isPending: isLoading,
  } = useSignMessage({
    mutation: {
      onError: ({ message }) => truncatedToaster('Error!', message),
    },
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    ;(async () => {
      if (signature) {
        if (!address) return

        const code = form.getValues('code')

        const message = `Redeemed code is ${code}`

        const isVerified = useVerifyMessage({
          address,
          message,
          signature,
        })

        if (!isVerified) return truncatedToaster('Error!', 'Invalid signature.')

        const isCodeValid = await redeemCode(address, code)

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
        className="max-w-[440px] w-full mx-auto flex items-center sm:justify-items-start justify-center"
      >
        <div className="flex sm:items-end items-center justify-center gap-5 sm:flex-row flex-col">
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
