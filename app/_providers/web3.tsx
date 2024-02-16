'use client'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { chains } from './chain-images'

import { rainbowTheme } from './rainbow-theme'

const queryClient = new QueryClient()

export const projectId = 'c8cb5377bf1b35c1349bb08e2025d352'

if (!projectId) throw new Error('Project ID is not defined')

export const config = getDefaultConfig({
  appName: 'Whale',
  appDescription:
    'Multifunctional Omnichain Solution | Bridge & Refuel Powered by LayerZero',
  appUrl: 'https://whale-app.com',
  appIcon: 'https://whale-app.com/icon.png',
  projectId,
  chains,
  ssr: true,
})

export function ContextProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={rainbowTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
