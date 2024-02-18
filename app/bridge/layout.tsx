import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridge',
  description:
    'Bridge your Whale NFTs between chains with Whale. Powered by LayerZero.',
}

export default function BridgeLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
