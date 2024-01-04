'use client'
import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrumNova, bsc, arbitrum } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [arbitrumNova, bsc, arbitrum],
  [publicProvider()],
)

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
        chains={chains}
        theme={midnightTheme({
          accentColor: 'hsla(20.5 90.2% 48.2%)',
          accentColorForeground: 'hsla(60 9.1% 97.8%)',
          borderRadius: 'medium',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
