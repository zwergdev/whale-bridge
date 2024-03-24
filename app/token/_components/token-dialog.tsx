import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import {
  MessageStatus,
  waitForMessageReceived,
} from '@layerzerolabs/scan-client'
import { Check, Loader, Plus } from '@/components/ui/icons'
import Link from 'next/link'
import { cloneElement, useState } from 'react'
import { TX_LINK } from '@/lib/constants'

type TokenDialogProps = {
  hash?: `0x${string}`
  open: boolean
  chainId: number
  isLayerZero: boolean
  onOpenChange: (open: boolean) => void
  chainTo: number
}

export const TokenDialog = ({
  open,
  hash,
  chainId,
  onOpenChange,
  isLayerZero,
  chainTo,
}: TokenDialogProps) => {
  const [txStatus, setTxStatus] = useState(MessageStatus.INFLIGHT)

  waitForMessageReceived(chainTo, hash!).then(({ status }) => {
    if (status === MessageStatus.DELIVERED)
      return setTxStatus(MessageStatus.DELIVERED)

    if (status === MessageStatus.FAILED)
      return setTxStatus(MessageStatus.FAILED)
  })

  function renderStatus() {
    if (txStatus === MessageStatus.INFLIGHT) {
      return {
        icon: <Loader className="animate-spin-slow" />,
        text: 'Token transaction in process.',
      }
    }
    if (txStatus === MessageStatus.DELIVERED) {
      return {
        icon: <Check className="stroke-green-600" />,
        text: 'Transaction delivered.',
      }
    }
    return {
      icon: <Plus className="rotate-45 stroke-red-700" />,
      text: 'Transaction failed.',
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transaction status</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center justify-center py-8 relative">
            {isLayerZero ? (
              <>
                {(() => {
                  const { icon, text } = renderStatus()
                  return (
                    <>
                      {cloneElement(icon, { size: 32 })}
                      <p className="text-xl font-medium text-foreground mt-4 mb-2">
                        {text}
                      </p>
                    </>
                  )
                })()}
                <p>
                  You can verify its status using the{' '}
                  <Link
                    href="https://layerzeroscan.com/"
                    target="_blank"
                    className="text-foreground hover:underline"
                  >
                    LayerZero
                  </Link>{' '}
                  explorer.
                </p>
              </>
            ) : (
              <Check className="stroke-green-600 mb-16" size={52} />
            )}

            <div
              className={cn(
                'flex gap-4 items-center w-full',
                isLayerZero && 'mt-16',
              )}
            >
              <div className="truncate max-w-96 text-left">
                <p>
                  Transaction link:{' '}
                  <Link
                    target="_blank"
                    href={`https://${TX_LINK[chainId]}/tx/${hash}`}
                    className="text-foreground underline"
                  >
                    {`${TX_LINK[chainId]}/tx/${hash}`}
                  </Link>
                </p>

                {isLayerZero && (
                  <p className="mt-4">
                    LayerZero link:{' '}
                    <Link
                      target="_blank"
                      href={`https://layerzeroscan.com/tx/${hash}`}
                      className="text-foreground underline"
                    >
                      {`layerzeroscan.com/tx/${hash}`}
                    </Link>
                  </p>
                )}
              </div>
            </div>
            <div className="w-32 h-32 -z-10 bg-primary blur-[150px] absolute -bottom-20 left-0" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>New Transaction</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
