'use client'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
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
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const queryClient = new QueryClient()

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
    celo,
    gnosis,
    polygonZkEvm,
    meter,
    moonriver,
    harmonyOne,
    opBNB,
    kava,
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
  { name: 'Gnosis', id: 100, iconUrl: '/chain-logo/gnosis.svg' },
  { name: 'Polygon ZkEVM', id: 1101, iconUrl: '/chain-logo/polygon-zk.svg' },
  { name: 'Meter', id: 82, iconUrl: '/chain-logo/meter.svg' },
  { name: 'Moonriver', id: 1285, iconUrl: '/chain-logo/moonriver.svg' },
  { name: 'Harmony', id: 1666600000, iconUrl: '/chain-logo/harmony.svg' },
  { name: 'OpBNB', id: 204, iconUrl: '/chain-logo/op-bnb.svg' },
  { name: 'KAVA', id: 2222, iconUrl: '/chain-logo/kava.svg' },
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

const customTheme = {
  colors: {
    accentColor: 'hsl(195 93% 43%)',
    accentColorForeground: 'hsl(0, 0%, 100%)',
    actionButtonBorder: 'hsl(0, 0%, 0%)',
    actionButtonBorderMobile: 'hsl(0, 0%, 0%)',
    actionButtonSecondaryBackground: 'hsl(0, 0%, 100%)',
    closeButton: 'hsl(0, 0%, 73%)',
    closeButtonBackground: 'hsl(0, 0%, 8%)',
    connectButtonBackground: 'hsl(0, 0%, 0%)',
    connectButtonBackgroundError: 'hsl(360,100%,64%)',
    connectButtonInnerBackground: 'hsl(0, 0%, 9%)',
    connectButtonText: 'hsl(0, 0%, 100%)',
    connectButtonTextError: 'hsl(0,0%,100%)',
    error: 'hsl(0,0%,100%)',
    generalBorder: 'hsl(0, 0%, 8%)',
    generalBorderDim: 'rgba(0, 0, 0, 0.03)',
    menuItemBackground: 'hsl(227, 0%, 8%)',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: 'hsl(0, 0%, 0%)',
    modalBorder: 'hsl(0, 0%, 8%)',
    modalText: 'hsl(0, 0%, 100%)',
    modalTextDim: 'rgba(60, 66, 66, 0.3)',
    modalTextSecondary: 'hsl(0, 0%, 60%)',
    profileAction: 'hsl(0, 0%, 15%)',
    profileActionHover: 'hsl(0, 0%, 25%)',
    profileForeground: 'hsl(0, 0%, 6%)',
    selectedOptionBorder: 'hsl(195 93% 43%)',
    downloadBottomCardBackground:
      '"linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF"',
    downloadTopCardBackground:
      '"linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF"',
    connectionIndicator: 'hsl(107, 100%, 44%)',
    standby: 'hsl(47, 100%, 63%)',
  },
  radii: {
    actionButton: '18px',
    connectButton: '9px',
    menuButton: '9px',
    modal: '18px',
    modalMobile: '18px',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
    walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
  },
  blurs: {
    modalOverlay: 'blur(0px)', // e.g. 'blur(4px)'
  },
  fonts: {
    body: '...', // default
  },
}

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={RAINBOW_CHAINS} theme={customTheme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
