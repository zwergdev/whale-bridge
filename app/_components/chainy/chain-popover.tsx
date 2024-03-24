'use client'

import { Popover } from '@/components/ui'
import React, { useState } from 'react'
import { ChainList, ChainListProps, ChainyTrigger } from './chains-popover'

type ChainsPopoverProps = Omit<
  ChainListProps,
  'isChainGridView' | 'setIsChainGridView'
>

export const ChainPopover = ({ onSelect, ...rest }: ChainsPopoverProps) => {
  const [open, setOpen] = useState(false)
  const [isChainGridView, setIsChainGridView] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <ChainyTrigger selectedValue={rest.fieldValue} />
      <ChainList
        {...rest}
        isChainGridView={isChainGridView}
        setIsChainGridView={setIsChainGridView}
        onSelect={(value, chainId) => {
          setOpen(false)
          onSelect(value, chainId)
        }}
      />
    </Popover>
  )
}
