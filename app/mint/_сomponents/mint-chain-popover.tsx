'use client'

import { CHAINS } from '@/app/_utils/chains'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useSwitchChain } from 'wagmi'

export const MintChainPopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { switchChain } = useSwitchChain()

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger className="mb-10 rounded-full w-fit border border-primary bg-[#011e37]/30 backdrop-blur-md flex items-center gap-2.5 justify-start p-2.5 hover:bg-[#011e37]/60 transition-colors duration-300">
        {Array.from(CHAINS)
          .splice(0, 3)
          .map(({ image }, idx) => (
            <Image
              key={idx}
              src={image}
              alt="chain-picture"
              className="rounded-full"
              width={30}
              height={30}
            />
          ))}
        And Other Chains
        <ChevronsUpDown size={20} />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex gap-3 flex-wrap p-1.5 w-[312px] border-popover bg-[#011e37]/70 backdrop-blur-md rounded-[22px] items-center sm:justify-center justify-start"
      >
        {CHAINS.map(({ chainId, image }) => (
          <button
            key={chainId}
            type="button"
            onClick={() => {
              switchChain({ chainId })
              setIsPopoverOpen(false)
            }}
            className="hover:bg-popover p-1 rounded-full transition-colors duration-300"
          >
            <Image
              src={image}
              width={30}
              height={30}
              alt="chain-image"
              className="rounded-full"
            />
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
