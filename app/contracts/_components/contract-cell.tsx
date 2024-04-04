'use client'

import { TableCell } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Copy, CopyCheck } from '@/components/ui/icons'
import Link from 'next/link'
import { useState } from 'react'
import { convert } from '@/app/_utils'

export const ContractCell = ({
  explorer,
  address,
}: { explorer: string; address?: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(address!)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <TableCell className="last-of-type:text-right">
      {address ? (
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`https://${explorer}/address/${address}`}
            target="_blank"
            className="hover:underline"
          >
            {convert(address)}
          </Link>

          <button
            type="button"
            onClick={handleCopy}
            className="relative"
            disabled={copied}
          >
            <Copy
              size={14}
              className="opacity-75 hover:opacity-100 transition-all duration-200 relative z-10"
            />
            <CopyCheck
              size={14}
              className={cn(
                'opacity-0 transition-opacity duration-200 absolute left-0 top-0',
                copied && 'opacity-100',
              )}
            />
          </button>
        </div>
      ) : (
        '...'
      )}
    </TableCell>
  )
}
