import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Token',
  description:
    'Claim and bridge token $BWHL on Whale and enjoy the benefits of LayerZero.',
}

export default function TokenLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
