export const CHAINS = [
  {
    label: 'BSC',
    value: 102,
    v2Value: 30102,
    image: '/chain-logo/bnb.svg',
    chainId: 56,
  },
  {
    label: 'zkSync',
    value: 165,
    v2Value: 30165,
    image: '/chain-logo/zk.svg',
    chainId: 324,
  },
  {
    label: 'Base',
    value: 184,
    v2Value: 30184,
    image: '/chain-logo/base.svg',
    chainId: 8453,
  },
  {
    label: 'Linea',
    value: 183,
    v2Value: 30183,
    image: '/chain-logo/linea.svg',
    chainId: 59144,
  },
  {
    label: 'Arbitrum Nova',
    value: 175,
    v2Value: 30175,
    image: '/chain-logo/arb-nova.svg',
    chainId: 42170,
  },
  {
    label: 'Polygon',
    value: 109,
    v2Value: 99999999999,
    image: '/chain-logo/polygon.svg',
    chainId: 137,
  },
  {
    label: 'Arbitrum',
    value: 110,
    v2Value: 30110,
    image: '/chain-logo/arb.svg',
    chainId: 42161,
  },
  {
    label: 'Scroll',
    value: 214,
    v2Value: 30214,
    image: '/chain-logo/scroll.svg',
    chainId: 534352,
  },
  {
    label: 'Optimism',
    value: 111,
    v2Value: 30111,
    image: '/chain-logo/optimism.svg',
    chainId: 10,
  },
  {
    label: 'Moonbeam',
    value: 126,
    v2Value: 30126,
    image: '/chain-logo/moonbeam.svg',
    chainId: 1284,
  },
  {
    label: 'Avalanche',
    value: 106,
    v2Value: 30106,
    image: '/chain-logo/avalanche.svg',
    chainId: 43114,
  },
  {
    label: 'Fantom',
    value: 112,
    v2Value: 30112,
    image: '/chain-logo/fantom.svg',
    chainId: 250,
  },
  {
    label: 'Celo',
    value: 125,
    v2Value: 30125,
    image: '/chain-logo/celo.svg',
    chainId: 42220,
  },
  {
    label: 'Gnosis',
    value: 145,
    v2Value: 30145,
    image: '/chain-logo/gnosis.svg',
    chainId: 100,
  },
  {
    label: 'Polygon zkEVM',
    value: 158,
    v2Value: 30158,
    image: '/chain-logo/polygon-zk.svg',
    chainId: 1101,
  },
  {
    label: 'Meter',
    value: 176,
    v2Value: 30176,
    image: '/chain-logo/meter.svg',
    chainId: 82,
  },
  {
    label: 'Moonriver',
    value: 167,
    v2Value: 30167,
    image: '/chain-logo/moonriver.svg',
    chainId: 1285,
  },
  {
    label: 'Harmony',
    value: 116,
    v2Value: 30116,
    image: '/chain-logo/harmony.svg',
    chainId: 1666600000,
  },
  {
    label: 'opBNB',
    value: 202,
    v2Value: 30202,
    image: '/chain-logo/op-bnb.svg',
    chainId: 204,
  },
  {
    label: 'KAVA',
    value: 177,
    v2Value: 30177,
    image: '/chain-logo/kava.svg',
    chainId: 2222,
  },
  {
    label: 'Zora',
    value: 195,
    v2Value: 30195,
    image: '/chain-logo/zora.svg',
    chainId: 30177,
  },
  {
    label: 'Klaytn',
    value: 150,
    v2Value: 30150,
    image: '/chain-logo/klaytn.svg',
    chainId: 8217,
  },
  {
    label: 'Mantle',
    value: 181,
    v2Value: 30181,
    image: '/chain-logo/mantle.svg',
    chainId: 5000,
  },
  {
    label: 'CoreDAO',
    value: 153,
    v2Value: 30153,
    image: '/chain-logo/core-dao.svg',
    chainId: 1116,
  },
  {
    label: 'Fuse',
    value: 138,
    v2Value: 30138,
    image: 'chain-logo/fuse.svg',
    chainId: 122,
  },
  {
    label: 'Metis',
    value: 151,
    v2Value: 30151,
    image: 'chain-logo/metis.svg',
    chainId: 1088,
  },
  {
    label: 'ShimmerEVM',
    value: 230,
    v2Value: 30230,
    image: 'chain-logo/shimmer-evm.svg',
    chainId: 148,
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
  8217: 'scope.klaytn.com', //klaytn
  5000: 'explorer.mantle.xyz', // mantle
  1116: 'scan.coredao.org', // core-dao
  122: 'explorer.fuse.io', // fuse
  1088: 'explorer.metis.io', // metis
  148: 'explorer.evm.shimmer.network', // shimmer-evm
}
