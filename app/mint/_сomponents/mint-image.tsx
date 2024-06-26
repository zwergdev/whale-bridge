'use client'

import { cn } from '@/lib/utils'
import arbitrumNova from '@/public/nft/nft-arbitrum-nova.webp'
import arbitrum from '@/public/nft/nft-arbitrum.webp'
import avalanche from '@/public/nft/nft-avalanche.webp'
import base from '@/public/nft/nft-base.webp'
import bsc from '@/public/nft/nft-bsc.webp'
import celo from '@/public/nft/nft-celo.webp'
import core from '@/public/nft/nft-core-dao.webp'
import fantom from '@/public/nft/nft-fantom.webp'
import fuse from '@/public/nft/nft-fuse.webp'
import gnosis from '@/public/nft/nft-gnosis.webp'
import harmony from '@/public/nft/nft-harmony.webp'
import kava from '@/public/nft/nft-kava.webp'
import klaytn from '@/public/nft/nft-klaytn.webp'
import defaultImage from '@/public/nft/nft-l0.webp'
import linea from '@/public/nft/nft-linea.webp'
import mantle from '@/public/nft/nft-mantle.webp'
import meter from '@/public/nft/nft-meter.webp'
import metis from '@/public/nft/nft-metis.webp'
import moonbeam from '@/public/nft/nft-moonbeam.webp'
import moonriver from '@/public/nft/nft-moonriver.webp'
import opbnb from '@/public/nft/nft-opbnb.webp'
import optimism from '@/public/nft/nft-optimism.webp'
import polygonZk from '@/public/nft/nft-polygon-zk.webp'
import polygon from '@/public/nft/nft-polygon.webp'
import scroll from '@/public/nft/nft-scroll.webp'
import zk from '@/public/nft/nft-zk.webp'
import zora from '@/public/nft/nft-zora.webp'
import shimmer from '@/public/nft/nft-shimmer.webp'
import Image, { StaticImageData } from 'next/image'
import { useAccount } from 'wagmi'

const IMAGES: { [key: number]: StaticImageData } = {
  0: defaultImage,
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
  43114: avalanche,
  250: fantom,
  42220: celo,
  100: gnosis,
  1101: polygonZk,
  82: meter,
  1285: moonriver,
  1666600000: harmony,
  204: opbnb,
  2222: kava,
  7777777: zora,
  8217: klaytn,
  5000: mantle,
  1116: core,
  122: fuse,
  1088: metis,
  148: shimmer,
}

type MintImageProps = {
  size?: number
  className?: string
}

export const MintImage = ({ className, size = 440 }: MintImageProps) => {
  const { status, chain } = useAccount()

  const chainId = chain?.id ?? 0

  return (
    <Image
      src={chainId && status === 'connected' ? IMAGES[chainId] : defaultImage}
      quality={100}
      placeholder="blur"
      width={size}
      height={size}
      className={cn('rounded-xl', className)}
      alt="mint-picture"
    />
  )
}
