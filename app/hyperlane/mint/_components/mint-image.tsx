'use client'
import { useGetAccount } from '@/app/_hooks/use-get-account'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type MintImageProps = {
  size?: number
  className?: string
}

export const MintImage = ({ className, size = 440 }: MintImageProps) => {
  const { status, chain } = useGetAccount()

  const chainId = chain?.id ?? 0

  return (
    <Image
      src={
        chainId && status === 'connected'
          ? '/nft/nft-l0.webp'
          : '/nft/nft-l0.webp'
      }
      quality={100}
      width={size}
      height={size}
      className={cn('rounded-xl', className)}
      alt="mint-picture"
    />
  )
}
