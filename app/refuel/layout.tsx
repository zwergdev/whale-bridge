import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refuel',
  description:
    'Refuel your assets on Whale and enjoy the benefits of LayerZero.',
}

export default function RefuelLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
