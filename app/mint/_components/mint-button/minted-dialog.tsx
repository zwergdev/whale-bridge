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
  onClick: () => void
}

export const MintedDialog = ({ open, onClick, hash }: MintedDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You've successfully minted LZNFT!</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex gap-4 items-center">
              <Image
                src="/whale.jpg"
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
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
