import { delay } from '@/lib/utils'
import { Copy, CopyCheck } from 'lucide-react'
import { useState } from 'react'
import { ReferalsCounter } from './referrals-counter'

export const OwnedCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    setCopied(true)
    await navigator.clipboard.writeText(code)
    await delay(3000)
    setCopied(false)
  }

  return (
    <div className="mb-8 sm:max-w-[440px] max-w-[320px] w-full mx-auto flex flex-col items-start justify-items-start text-lg font-semibold">
      Your code:
      <div className="flex items-center justify-center gap-4">
        <h6 className="px-6 h-12 sm:min-w-72 w-auto rounded-xl bg-popover flex items-center justify-center mb-2">
          {code}
        </h6>
        <button
          type="button"
          className="hover:text-primary hover:scale-110 transition-all duration-300"
          onClick={copyCode}
        >
          {copied ? (
            <CopyCheck className="h-5 w-5" />
          ) : (
            <Copy className="h-5 w-5" />
          )}
        </button>
      </div>
      <ReferalsCounter code={code} />
    </div>
  )
}
