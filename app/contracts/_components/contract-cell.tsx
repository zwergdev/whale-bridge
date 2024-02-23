'use client'

import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Copy, CopyCheck } from 'lucide-react'
import { useState } from 'react'
import { convert } from '../utils'

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
          <a
            href={`https://${explorer}/address/${address}`}
            referrerPolicy="no-referrer"
            className="hover:underline"
          >
            {convert(address)}
          </a>

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
