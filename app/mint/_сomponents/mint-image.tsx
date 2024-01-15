'use client'

import Image from 'next/image'

export const MintImage = () => {
  return (
    <Image
      src="/mint-nft.webp"
      width={440}
      height={440}
      className="rounded-xl"
      alt="mint-picture"
    />
  )
}
