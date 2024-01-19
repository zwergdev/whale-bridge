'use client'

import Image, { StaticImageData } from 'next/image'
import { useNetwork, useAccount } from 'wagmi'
import bsc from '@/public/nft-bsc.webp'
import polygon from '@/public/nft-polygon.webp'
import arbitrumNova from '@/public/nft-arbitrum-nova.webp'
import arbitrum from '@/public/nft-arbitrum.webp'
import defaultImage from '@/public/mint-nft.webp'
import { cn } from '@/lib/utils'

const IMAGES: { [key: number]: StaticImageData } = {
  56: bsc,
  137: polygon,
  42170: arbitrumNova,
  42161: arbitrum,
  534352: defaultImage,
  324: defaultImage,
}

type MintImageProps = {
  chainId?: number
  size?: number
  className?: string
}

export const MintImage = ({
  chainId,
  className,
  size = 440,
}: MintImageProps) => {
  const { chain } = useNetwork()
  const { status } = useAccount()

  const definedChain = chainId || chain?.id

  return (
    <Image
      src={
        definedChain && status === 'connected'
          ? IMAGES[definedChain]
          : defaultImage
      }
      quality={100}
      placeholder="blur"
      width={size}
      height={size}
      className={cn('rounded-xl', className)}
      alt="mint-picture"
    />
  )
}
