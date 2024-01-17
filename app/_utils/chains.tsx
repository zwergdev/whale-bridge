import Image from 'next/image'

export const CHAINS = [
  { label: 'BSC', value: 102, image: '/bnb.svg', chainId: 56 },
  {
    label: 'Arbitrum Nova',
    value: 175,
    image: '/arb-nova.svg',
    chainId: 42170,
  },
  { label: 'Polygon', value: 109, image: '/polygon.svg', chainId: 137 },
  { label: 'Arbitrum', value: 110, image: '/arb.svg', chainId: 42161 },
  { label: 'Scroll', value: 214, image: '/scroll.svg', chainId: 534352 },
  { label: 'zkSync', value: 165, image: '/zk.svg', chainId: 324 },
]

export const TX_LINK: { [chainId: number]: string } = {
  42170: 'nova.arbiscan.io', // arbitrum-nova
  56: 'bscscan.com', // bsc
  137: 'polygonscan.com', // polygon
  42161: 'arbiscan.io', // arbitrum
}

export const selectedChain = (fieldValue: number) => {
  const selectedChain = CHAINS.find(({ value }) => value === fieldValue)
  if (!selectedChain) return 'Select chain'
  return (
    <div className="flex items-center w-full">
      <Image
        src={selectedChain.image}
        width={48}
        height={48}
        alt="selected-chain-icon"
        className="md:w-12 md:h-12 w-6 h-6 rounded-full"
      />
      <p className="w-full text-base text-center font-medium">
        {selectedChain.label}
      </p>
    </div>
  )
}
