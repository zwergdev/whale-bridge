import { Copy, CopyCheck } from 'lucide-react'
import { useState } from 'react'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const OwnedCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    setCopied(true)
    await navigator.clipboard.writeText(code)
    await delay(3000)
    setCopied(false)
  }

  return (
    <div className="mb-10 max-w-[440px] w-full mx-auto flex flex-col items-start justify-items-start text-lg font-semibold">
      Your code:
      <div className="flex items-center justify-center gap-4">
        <h6 className="px-6 h-12 min-w-72 rounded-xl bg-popover flex items-center justify-center mb-2">
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
    </div>
  )
}
