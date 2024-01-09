import Image from 'next/image'

export const CHAINS = [
  { label: 'BSC', value: 102, image: '/bnb.svg', chainId: 56 },
  {
    label: 'Arbitrum Nova',
    value: 175,
    image: '/arb-nova.svg',
    chainId: 42170,
  },
  { label: 'Polygon', value: 137, image: '/polygon.svg', chainId: 137 },
] as const

export const selectedChain = (fieldValue: number) => {
  const selectedChain = CHAINS.find(({ value }) => value === fieldValue)
  if (!selectedChain) return 'Select chain'
  return (
    <div className="flex items-center w-full">
      <Image
        src={selectedChain.image}
        width={54}
        height={54}
        alt="selected-chain-icon"
      />
      <p className="w-full text-base text-center font-medium">
        {selectedChain.label}
      </p>
    </div>
  )
}
