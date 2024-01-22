import { TX_LINK } from '../../_utils/chains'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { Check, Loader, Plus } from 'lucide-react'
import {
  waitForMessageReceived,
  MessageStatus,
} from '@layerzerolabs/scan-client'
import { cloneElement, useState } from 'react'
import { MintImage } from '@/app/mint/_сomponents/mint-image'

type RefueledDialogProps = {
  hash?: `0x${string}`
  open: boolean
  chainId: number
  onOpenChange: (open: boolean) => void
  chainTo: number
}

export const RefueledDialog = ({
  open,
  hash,
  chainId,
  onOpenChange,
  chainTo,
}: RefueledDialogProps) => {
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
        text: 'Refuel transaction in process.',
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
          <AlertDialogDescription className="flex flex-col items-center justify-center py-8">
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

            <div className="flex gap-4 items-center mt-16 w-full">
              <MintImage
                className="border border-border"
                size={100}
                chainId={chainId}
              />
              <div className="truncate max-w-96 text-left">
                <p>Transaction link:</p>

                <Link
                  target="_blank"
                  href={`https://${TX_LINK[chainId]}/tx/${hash}`}
                  className="text-foreground underline"
                >
                  {`${TX_LINK[chainId]}/tx/${hash}`}
                </Link>
                <p className="mt-4">LayerZero link:</p>

                <Link
                  target="_blank"
                  href={`https://layerzeroscan.com/tx/${hash}`}
                  className="text-foreground underline"
                >
                  {`layerzeroscan.com/tx/${hash}`}
                </Link>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}