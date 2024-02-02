'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export const ReadMore = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <p className="font-medium text-base mb-12 max-w-lg">
      Release the whale in you and dive into the exciting ocean of
      cryptocurrency. You're not just minting an NFT, you're writing history in
      the ledger of digital art
      <span className={cn(expanded && 'hidden')}>
        ...{' '}
        <button
          type="button"
          className="text-primary"
          onClick={() => setExpanded(true)}
        >
          Read more
        </button>
      </span>
      {expanded &&
        ". Don't be a small fish, become a crypto whale and make a splash in the sea of success. This NFT help you!"}
    </p>
  )
}
