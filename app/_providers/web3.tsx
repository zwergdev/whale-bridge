'use client'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrumNova, bsc, polygon, arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [arbitrumNova, bsc, polygon, arbitrum],
  [publicProvider()],
)

const RAINBOW_CHAINS = [
  { name: 'BSC', id: 56, iconUrl: '/bnb.svg' },
  {
    name: 'Arbitrum Nova',
    id: 42170,
    iconUrl: '/arb-nova.svg',
  },
  { name: 'Polygon', id: 137, iconUrl: '/polygon.svg' },
  { name: 'Arbitrum', id: 42161, iconUrl: '/arb.svg' },
]

const { connectors } = getDefaultWallets({
  appName: 'Whale Bridge App',
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
