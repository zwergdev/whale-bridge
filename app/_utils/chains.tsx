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
  {
    label: 'Avalanche',
    value: 106,
    image: '/chain-logo/avalanche.svg',
    chainId: 43114,
  },
  {
    label: 'Fantom',
    value: 112,
    image: '/chain-logo/fantom.svg',
    chainId: 250,
  },
  {
    label: 'Celo',
    value: 125,
    image: '/chain-logo/celo.svg',
    chainId: 42220,
  },
  {
    label: 'Gnosis',
    value: 145,
    image: '/chain-logo/gnosis.svg',
    chainId: 100,
  },
  {
    label: 'Polygon zkEVM',
    value: 158,
    image: '/chain-logo/polygon-zk.svg',
    chainId: 1101,
  },
  {
    label: 'Meter',
    value: 176,
    image: '/chain-logo/meter.svg',
    chainId: 82,
  },
  {
    label: 'Moonriver',
    value: 167,
    image: '/chain-logo/moonriver.svg',
    chainId: 1285,
  },
  {
    label: 'Harmony',
    value: 116,
    image: '/chain-logo/harmony.svg',
    chainId: 1666600000,
  },
  {
    label: 'opBNB',
    value: 202,
    image: '/chain-logo/op-bnb.svg',
    chainId: 204,
  },
  {
    label: 'KAVA',
    value: 177,
    image: '/chain-logo/kava.svg',
    chainId: 2222,
  },
  {
    label: 'Zora',
    value: 195,
    image: '/chain-logo/zora.svg',
    chainId: 7777777,
  },
  {
    label: 'Klaytn',
    value: 150,
    image: '/chain-logo/klaytn.svg',
    chainId: 8217
  }
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
  43114: 'subnets.avax.network/c-chain', // avalanche
  250: 'ftmscan.com', // fantom
  42220: 'celoscan.io', // celo
  100: 'gnosisscan.io', // gnosis
  1101: 'zkevm.polygonscan.com', // polygon-zk
  82: 'scan.meter.io', // meter
  1285: 'moonriver.moonscan.io', // moonriver
  1666600000: 'explorer.harmony.one', // harmony
  204: 'opbnb.bscscan.com', // op-bnb
  2222: 'kavascan.com', // kava
  7777777: 'explorer.zora.energy', // zora
  8217: 'scope.klaytn.com' //klaytn
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
