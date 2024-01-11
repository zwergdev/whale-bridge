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
import Image from 'next/image'
import Link from 'next/link'
import { Loader } from 'lucide-react'

type BridgedDialogProps = {
  hash?: `0x${string}`
  open: boolean
  chainId: number
  onOpenChange: (open: boolean) => void
}

export const BridgedDialog = ({
  open,
  hash,
  chainId,
  onOpenChange,
}: BridgedDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transaction status</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center justify-center py-8">
            <Loader className="mb-4 h-8 w-8 animate-spin-slow" />
            <p className="text-xl font-medium text-foreground mb-2">
              Bridge transaction in process.
            </p>
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
              <Image
                src="/bridge-nft.webp"
                width={100}
                height={100}
                alt="nft-image"
                className="border border-border rounded-lg"
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
