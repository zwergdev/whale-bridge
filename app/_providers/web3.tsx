'use client'

import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import {
  arbitrum,
  arbitrumNova,
  base,
  bsc,
  linea,
  moonbeam,
  optimism,
  polygon,
  scroll,
  zkSync,
  avalanche,
  fantom,
  celo,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [
    arbitrumNova,
    bsc,
    polygon,
    arbitrum,
    scroll,
    zkSync,
    optimism,
    linea,
    base,
    moonbeam,
    avalanche,
    fantom,
    celo
  ],
  [publicProvider()],
)

const RAINBOW_CHAINS = [
  {
    name: 'Arbitrum Nova',
    id: 42170,
    iconUrl: '/chain-logo/arb-nova.svg',
  },
  { name: 'BSC', id: 56, iconUrl: '/chain-logo/bnb.svg' },
  { name: 'Polygon', id: 137, iconUrl: '/chain-logo/polygon.svg' },
  { name: 'Arbitrum', id: 42161, iconUrl: '/chain-logo/arb.svg' },
  { name: 'Scroll', id: 534352, iconUrl: '/chain-logo/scroll.svg' },
  { name: 'zkSync', id: 324, iconUrl: '/chain-logo/zk.svg' },
  { name: 'Optimism', id: 10, iconUrl: '/chain-logo/optimism.svg' },
  { name: 'Linea', id: 59144, iconUrl: '/chain-logo/linea.svg' },
  { name: 'Base', id: 8453, iconUrl: '/chain-logo/base.svg' },
  { name: 'Moonbeam', id: 1284, iconUrl: '/chain-logo/moonbeam.svg' },
  { name: 'Avalanche', id: 43114, iconUrl: '/chain-logo/avalanche.svg' },
  { name: 'Fantom', id: 250, iconUrl: '/chain-logo/fantom.svg' },
  { name: 'Celo', id: 42220, iconUrl: '/chain-logo/celo.svg' },
]

const { connectors } = getDefaultWallets({
  appName: 'Whale',
  projectId: 'c8cb5377bf1b35c1349bb08e2025d352',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={RAINBOW_CHAINS}
        theme={midnightTheme({
          accentColor: 'hsla(195, 97%, 51%)',
          accentColorForeground: 'hsla(60 9.1% 97.8%)',
          borderRadius: 'medium',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
