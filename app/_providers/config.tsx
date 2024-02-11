import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import {
  arbitrum,
  arbitrumNova,
  avalanche,
  base,
  bsc,
  celo,
  fantom,
  gnosis,
  harmonyOne,
  kava,
  linea,
  meter,
  moonbeam,
  moonriver,
  opBNB,
  optimism,
  polygon,
  polygonZkEvm,
  scroll,
  zkSync,
  zora,
  klaytn,
  coreDao
} from 'wagmi/chains'

export const projectId = 'c8cb5377bf1b35c1349bb08e2025d352'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Whale',
  description:
    'Multifunctional Omnichain Solution | Bridge & Refuel Powered by LayerZero',
  url: 'https://whale-app.com', // origin must match your domain & subdomain
  icons: ['https://whale-app.com/icon.png'],
}

export const config = defaultWagmiConfig({
  chains: [
    zkSync,
    polygon,
    arbitrumNova,
    bsc,
    linea,
    arbitrum,
    scroll,
    optimism,
    base,
    moonbeam,
    avalanche,
    fantom,
    celo,
    gnosis,
    polygonZkEvm,
    meter,
    moonriver,
    harmonyOne,
    opBNB,
    kava,
    zora,
    klaytn,
    coreDao
  ], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: false, // Optional - true by default
})
