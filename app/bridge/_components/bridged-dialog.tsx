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
          <AlertDialogTitle>You've successfully bridged TWHL!</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex gap-4 items-center">
              <Image
                src="/bridge-nft.webp"
                width={100}
                height={100}
                alt="nft-image"
                className="border border-border rounded-lg"
              />
              <div className="truncate max-w-96 text-left">
                <p className="mb-2">You're able to check transaction.</p>
                Transaction link:{' '}
                <Link
                  target="_blank"
                  href={`https://${TX_LINK[chainId]}/tx/${hash}`}
                  className="text-foreground underline"
                >
                  {`${TX_LINK[chainId]}/tx/${hash}`}
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
