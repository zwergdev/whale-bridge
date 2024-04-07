'use client'
import { ChainPopover, RepeatButton, SubmitButton } from '@/app/_components'
import { useCustomSwitchChain, useGetBalance } from '@/app/_hooks'
import { useGetAccount } from '@/app/_hooks/use-get-account'
import { BridgeForm, BridgeSchema } from '@/app/_utils'
import { BalanceIndicator } from '@/app/refuel/_components'
import { Paper } from '@/components/ui'
import { LayerZero } from '@/components/ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSwitchChain } from 'wagmi'

export default function HyperlaneBridge() {
  const { chain, chainId } = useGetAccount()
  const { switchChain } = useSwitchChain()
  const { balanceFrom, symbol } = useGetBalance()

  const { watch, setValue } = useForm<BridgeForm>({
    resolver: zodResolver(BridgeSchema),
    defaultValues: {
      chainFrom: chainId === 0 ? 42161 : chainId,
      chainTo: chainId === 42161 ? 42170 : 56,
      tokenId: '0',
      nfts: [],
    },
  })

  const fields = watch()

  return (
    <>
      <Paper title="NFT BRIDGE">
        <form className="relative">
          <div className="w-full flex items-center justify-center">
            <div className="w-full flex flex-col">
              <div className="flex w-full justify-center items-center">
                <span>Transfer from</span>
                <BalanceIndicator balance={balanceFrom} symbol={symbol} />
              </div>
              <ChainPopover
                selectedValue={fields.chainTo}
                isPopoverFROM={true}
                // fieldValue={field.value}
                fieldValue={fields.chainFrom}
                onSelect={(value, chainId) => {
                  setValue('chainFrom', value)
                  if (chainId !== chain?.id) switchChain({ chainId })
                }}
              />
            </div>
            <RepeatButton
              onClick={() => {
                // ref.current = Date.now().toString()
                useCustomSwitchChain({
                  switchChain(chainId) {
                    switchChain({ chainId })
                  },
                  setValue: setValue,
                  chainFrom: fields.chainFrom,
                  chainTo: fields.chainTo,
                })
              }}
            />
            <div className="w-full flex flex-col">
              <div className="flex w-full justify-start items-center">
                <span>Transfer to</span>
              </div>
              <ChainPopover
                selectedValue={fields.chainFrom}
                // fieldValue={field.value}
                disabledChains={[165]}
                fieldValue={fields.chainTo}
                onSelect={(value) => {
                  setValue('chainTo', value)
                }}
              />
            </div>
          </div>
          {/* <SubmitButton disabled={!isValid} loading={isPending || isLoadingNFT}> */}
          <SubmitButton disabled={false}>Bridge</SubmitButton>
          <a href="https://layerzero.network/" rel="noreferrer">
            <LayerZero className="text-center w-full mt-10" />
          </a>
        </form>
      </Paper>
    </>
  )
}
