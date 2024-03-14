'use client'

import { Button } from '@/components/ui/button-new'
import { CHAIN_TO_SYMBOL, MAX_TO_FILL, SYMBOL_TO_CHAIN } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSwitchChain } from 'wagmi'
import { Prices, fetchPrices, useGetAccount, useWriteContract } from '../_hooks'
import { CHAINS } from '../_utils/chains'
import { GasForm, GasSchema } from '../_utils/schemas'
import { ChainTo, SelectedChain } from './_components'
import { GasDialog } from './_components/gas-dialog'
import { ChainParams, estimateFees, writeFillParams } from './_contracts'
import { SelectedChains, Total } from './_features'
import { ChainPopoverGasStation } from './_components/chain-popover'

export default function GasStationPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { switchChain } = useSwitchChain()
  const { chainId, address } = useGetAccount()
  const [prices, setPrices] = useState<Prices>()

  useEffect(() => {
    ;(async () => {
      const prices = await fetchPrices()
      setPrices(prices)
    })()
  }, [])

  useEffect(() => {
    setValue('chainFrom', chainId === 0 ? 42161 : chainId)
  }, [chainId])

  const {
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { isValid, errors },
    register,
  } = useForm<GasForm>({
    resolver: zodResolver(GasSchema),
    mode: 'all',
    defaultValues: {
      selectedChains: CHAINS.map((obj) => ({
        chainId: String(obj.chainId),
        name: obj.label,
        logo: obj.image,
        v2Value: obj.v2Value,
      })),
      chainFrom: chainId === 0 ? 42161 : chainId,
    },
  })

  const { fields: arrayFields, move } = useFieldArray({
    control,
    name: 'selectedChains',
  })

  const fields = watch()

  const { writeContractAsync, data: hash } = useWriteContract()

  const contractParams = fields.selectedChains
    .filter((o) => Number(o.valueInEther) > 0)
    .reduce((obj, item) => {
      obj[item.name] = {
        v2Value: item.v2Value,
        chainId: item.chainId,
        valueInEther: item.valueInEther!,
      }
      return obj
    }, {} as ChainParams)

  const { fee, refetchFee } = estimateFees(chainId, contractParams)

  const onSubmit = async (data: GasForm) => {
    const fees: any = await refetchFee()
    const lzFees = fees.data.reduce((p: bigint, c: bigint) => p + c, BigInt(0))

    await writeContractAsync(
      writeFillParams(chainId, lzFees, data.address, contractParams),
    )

    return setIsDialogOpen(true)
  }

  const fromSymbol = CHAIN_TO_SYMBOL[fields.chainFrom]
  const usd = prices ? prices[SYMBOL_TO_CHAIN[fromSymbol]].usd : 0

  const selectedChains = fields.selectedChains.filter(
    (ch) => Number(ch.valueInEther) > 0,
  )

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1053px] w-full min-h-[calc(100vh-160px)] pt-40 flex lg:items-start items-center justify-center gap-5 lg:flex-row flex-col"
      >
        <article className="max-w-sm sticky top-[70px] lg:top-24 z-50 flex items-center justify-center flex-col h-full w-full p-4 gap-6 text-foreground rounded-md border-popover border bg-[#011e37]/80  lg:bg-[#011e37]/30 backdrop-blur-md">
          <ChainPopoverGasStation
            selectedChain={fields.chainFrom}
            onSelect={(n) => setValue('chainFrom', n)}
          />

          <SelectedChains
            qty={selectedChains.length}
            total={fields.selectedChains.length}
          >
            {selectedChains.length ? (
              selectedChains.map((field) => (
                <SelectedChain
                  key={field.name}
                  name={field.name}
                  amount={field.valueInEther}
                  symbol={CHAIN_TO_SYMBOL[Number(field.chainId)]}
                  usamount={
                    prices
                      ? Number(field.valueInEther) *
                        prices[
                          SYMBOL_TO_CHAIN[
                            CHAIN_TO_SYMBOL[Number(field.chainId)]
                          ]
                        ].usd
                      : 0
                  }
                />
              ))
            ) : (
              <p className="text-[13px] leading-none">Empty</p>
            )}
          </SelectedChains>

          <Total
            disabled={
              !address ||
              chainId !== fields.chainFrom ||
              !isValid ||
              !selectedChains.length
            }
            usd={usd}
            symbol={fromSymbol}
            value={fee as bigint[]}
          >
            <div className="relative w-full">
              <input
                type="text"
                {...register('address')}
                autoComplete="off"
                placeholder="Address"
                className={cn(
                  'h-10 border-[#0d3b63]/50 bg-popover hover:bg-popover rounded-md border w-full relative z-50 py-3 px-2 outline-none text-sm placeholder:text-muted-foreground',
                  errors.address && 'border-destructive',
                )}
              />
              {errors?.address?.message && (
                <div className="absolute -top-2.5 right-1.5 border-destructive border rounded-sm bg-popover px-1 z-50 text-destructive text-xs h-4 flex items-center">
                  {errors.address.message}
                </div>
              )}
            </div>
          </Total>

          {address && chainId !== fields.chainFrom && (
            <Button
              onClick={() => switchChain?.({ chainId: fields.chainFrom })}
              type="button"
              className="h-10 w-full text-2xl uppercase"
            >
              SWITCH NETWORK
            </Button>
          )}
        </article>

        <article className="max-w-[590px] flex items-center justify-center flex-col h-full w-full p-4 gap-2 text-foreground rounded-md border-popover border bg-[#011e37]/30 backdrop-blur-md">
          <div className="w-full flex flex-col border border-ring rounded-md overflow-hidden">
            {arrayFields.map(({ id, name, logo, chainId }, i) => (
              <ChainTo
                key={id}
                name={name}
                logo={logo}
                selected={
                  Number(
                    fields.selectedChains.find((c) => c.name === name)
                      ?.valueInEther,
                  ) > 0
                }
                symbol={CHAIN_TO_SYMBOL[Number(chainId)]}
                max={MAX_TO_FILL[Number(chainId)]}
                valueInEther={fields.selectedChains[i].valueInEther}
                onChange={(v) => {
                  setValue(`selectedChains.${Number(i)}.valueInEther`, v)
                  move(i, 0)
                }}
                onMaxClick={() => {
                  {
                    setValue(
                      `selectedChains.${Number(i)}.valueInEther`,
                      MAX_TO_FILL[Number(chainId)].toString(),
                    )
                    move(i, 0)
                  }
                }}
              />
            ))}
          </div>
        </article>
      </form>
      <GasDialog
        hash={hash}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        chainId={chainId}
        srcChainId={CHAINS.find((c) => c.chainId === chainId)?.v2Value!}
      />
    </>
  )
}
