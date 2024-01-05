import Image from 'next/image'
export const CHAINS = [
  { label: 'BSC', value: 102, image: '/bnb.svg' },
  {
    label: 'Arbitrum Nova',
    value: 175,
    image: '/arb-nova.svg',
  },
  { label: 'Polygon', value: 137, image: '/polygon.svg' },
] as const

export const selectedChain = (fieldValue: number) => {
  const selectedChain = CHAINS.find(({ value }) => value === fieldValue)
  if (!selectedChain) return 'Select chain'
  return (
    <div className="flex items-center gap-2">
      <Image
        src={selectedChain.image}
        width={16}
        height={16}
        alt="selected-chain-icon"
      />
      {selectedChain.label}
    </div>
  )
}
