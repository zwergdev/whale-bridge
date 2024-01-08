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

type MintedDialogProps = {
  hash?: `0x${string}`
  open: boolean
}

export const MintedDialog = ({ open, hash }: MintedDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You've successfully minted LZNFT!</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex gap-4 items-center">
              <Image
                src="/mint-nft.webp"
                width={100}
                height={100}
                alt="nft-image"
                className="border border-border rounded-lg"
              />
              <div className="truncate max-w-96 text-left">
                <p className="mb-2">Now you're able to bridge your LZNFT.</p>
                Transaction link:{' '}
                <Link
                  target="_blank"
                  href={`https://nova.arbiscan.io/tx/${hash}`}
                  className="text-foreground underline"
                >
                  {`nova.arbiscan.io/tx/${hash}`}
                </Link>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>
            <Link href="/bridge">Continue</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
