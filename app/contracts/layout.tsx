import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contracts',
  description: 'A list of our contracts officially verified on LayerZero Scan.',
}

export default function ContractsLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
