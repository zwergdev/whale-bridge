'use client'

import { Whale } from '@/components/ui/icons'
import { BridgePage } from './_components/bridge'
import { MintPage } from './_components/mint'
import { useCallback, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { balance } from '@/app/_utils/contract-actions'

export default function MintBridgePage() {
  const [isMint, setIsMint] = useState(true)
  const [isMinted, setIsMinted] = useState(false)
  const { address } = useAccount()
  const { chain } = useNetwork()

  balance({
    address,
    onSuccess: (data) => {
      if (data > 0) {
        setIsMint(false)
        setIsMinted(true)
      }
    },
    chainId: chain?.id ?? 0,
  })

  const changePage = useCallback(() => {
    setIsMint((prev) => !prev)
  }, [])

  return (
    <>
      <div className="flex gap-6 mb-12 items-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <button
            type="button"
            className="bg-primary rounded-full px-2.5 pt-4 pb-[13px]"
            onClick={() => setIsMint(true)}
          >
            <Whale />
          </button>
          <p className="font-bold text-base text-primary">Mint NFT</p>
        </div>
        <div
          className={`w-24 h-1.5 rounded-full relative bottom-4 ${
            isMint ? 'bg-[#011D36]' : 'bg-primary'
          }`}
        />
        <div className="flex flex-col gap-2 items-center justify-center">
          <button
            type="button"
            onClick={() => {
              if (!isMinted) return
              setIsMint(false)
            }}
            className={`rounded-full px-2.5 pt-4 pb-[13px] ${
              isMint ? 'bg-[#011D36]' : 'bg-primary'
            }`}
          >
            <Whale />
          </button>
          <p className="font-bold text-base text-primary">Bridge</p>
        </div>
      </div>
      {isMint ? <MintPage changePage={changePage} /> : <BridgePage />}
    </>
  )
}
