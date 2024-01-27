import Image from 'next/image'

export const CHAINS = [
  { label: 'BSC', value: 102, image: '/chain-logo/bnb.svg', chainId: 56 },
  { label: 'zkSync', value: 165, image: '/chain-logo/zk.svg', chainId: 324 },
  { label: 'Base', value: 184, image: '/chain-logo/base.svg', chainId: 8453 },
  {
    label: 'Linea',
    value: 183,
    image: '/chain-logo/linea.svg',
    chainId: 59144,
  },
  {
    label: 'Arbitrum Nova',
    value: 175,
    image: '/chain-logo/arb-nova.svg',
    chainId: 42170,
  },
  {
    label: 'Polygon',
    value: 109,
    image: '/chain-logo/polygon.svg',
    chainId: 137,
  },
  {
    label: 'Arbitrum',
    value: 110,
    image: '/chain-logo/arb.svg',
    chainId: 42161,
  },
  {
    label: 'Scroll',
    value: 214,
    image: '/chain-logo/scroll.svg',
    chainId: 534352,
  },
  {
    label: 'Optimism',
    value: 111,
    image: '/chain-logo/optimism.svg',
    chainId: 10,
  },
  {
    label: 'Moonbeam',
    value: 126,
    image: '/chain-logo/moonbeam.svg',
    chainId: 1284,
  },
]

export const TX_LINK: { [chainId: number]: string } = {
  42170: 'nova.arbiscan.io', // arbitrum-nova
  56: 'bscscan.com', // bsc
  137: 'polygonscan.com', // polygon
  42161: 'arbiscan.io', // arbitrum
  534352: 'scrollscan.com', // scroll
  324: 'explorer.zksync.io', // zk
  10: 'optimistic.etherscan.io', // optimism
  8453: 'basescan.org', // base
  59144: 'lineascan.build', //linea
  1284: 'moonscan.io', // moonbeam
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
