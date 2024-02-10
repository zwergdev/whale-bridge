'use client'

import { config, projectId } from '@/app/_providers/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { ReactNode } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { chainImages } from './chain-images'

const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  chainImages,
  allWallets: 'HIDE',
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#09bffb',
    '--w3m-color-mix': '#0c0a09',
    '--w3m-color-mix-strength': 30,
    '--w3m-border-radius-master': '2px',
  },
})

export function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
