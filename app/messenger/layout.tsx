import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messenger',
  description:
    'Send omnichaim messages on Whale and enjoy the benefits of LayerZero.',
}

export default function MessengerLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
