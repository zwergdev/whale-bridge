'use client'

import { cn } from '@/lib/utils'
import arbitrumNova from '@/public/nft/nft-arbitrum-nova.webp'
import arbitrum from '@/public/nft/nft-arbitrum.webp'
import base from '@/public/nft/nft-base.webp'
import bsc from '@/public/nft/nft-bsc.webp'
import defaultImage from '@/public/nft/nft-l0.webp'
import linea from '@/public/nft/nft-linea.webp'
import moonbeam from '@/public/nft/nft-moonbeam.webp'
import optimism from '@/public/nft/nft-optimism.webp'
import polygon from '@/public/nft/nft-polygon.webp'
import scroll from '@/public/nft/nft-scroll.webp'
import zk from '@/public/nft/nft-zk.webp'
import Image, { StaticImageData } from 'next/image'
import { useAccount, useNetwork } from 'wagmi'

const IMAGES: { [key: number]: StaticImageData } = {
  56: bsc,
  137: polygon,
  42170: arbitrumNova,
  42161: arbitrum,
  534352: scroll,
  10: optimism,
  324: zk,
  59144: linea,
  8453: base,
  1284: moonbeam,
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

  console.log(chain)

  const definedChain = chainId || chain?.id

  return (
    <Image
      src={
        definedChain && status === 'connected'
          ? IMAGES[definedChain]
            ? IMAGES[definedChain]
            : defaultImage
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
