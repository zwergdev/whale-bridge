'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui'
import Link from 'next/link'
import { TX_LINK } from '@/lib/constants'
import { MintImage } from './mint-image'
import { X } from '@/components/ui/icons'
import { useEffect, useState } from 'react'

type MintedDialogProps = {
  hash?: string
  open: boolean
  chainId: number
}

export const MintedDialog = ({ open, hash, chainId }: MintedDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (open) setIsOpen(true)
  }, [open])

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>You've successfully minted WHL!</span>{' '}
            <X
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="relative">
            <div className="flex gap-4 items-center">
              <MintImage size={100} />
              <div className="truncate max-w-96 text-left">
                <p className="mb-2">Now you're able to bridge your WHL.</p>
                Transaction link:{' '}
                <Link
                  target="_blank"
                  href={`https://${TX_LINK[chainId]}/tx/${hash}`}
                  className="text-foreground underline"
                >
                  {`${TX_LINK[chainId]}`}
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
