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
import { TX_LINK } from '../../_utils/chains'
import { MintImage } from './mint-image'

type MintedDialogProps = {
  hash?: string
  open: boolean
  chainId: number
}

export const MintedDialog = ({ open, hash, chainId }: MintedDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You've successfully minted WHL!</AlertDialogTitle>
          <AlertDialogDescription className="relative">
            <div className="flex gap-4 items-center">
              <MintImage size={100} chainId={chainId} />
              <div className="truncate max-w-96 text-left">
                <p className="mb-2">Now you're able to bridge your WHL.</p>
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
            <div className="w-32 h-32 -z-10 bg-primary blur-[150px] absolute -bottom-20 left-0" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link href="/bridge">
            <AlertDialogAction>To Bridge</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
