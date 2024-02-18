import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mint',
  description: 'Mint your NFTs on Whale and enjoy the benefits of LayerZero.',
}

export default function MintLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
