'use client'

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import {
  WagmiProvider,
  cookieStorage,
  cookieToInitialState,
  createStorage,
} from 'wagmi'
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
  storage: createStorage({
    storage: cookieStorage,
  }),
})

export function ContextProvider({
  children,
  cookie,
}: {
  children: ReactNode
  cookie: string
}) {
  const initialState = cookieToInitialState(config, cookie)

  return (
    <WagmiProvider config={config} {...(initialState ? { initialState } : {})}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          locale="en"
          theme={rainbowTheme}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
