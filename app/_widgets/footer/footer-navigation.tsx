'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAVIGATION = [
  { href: '/mint', label: 'Mint NFT' },
  { href: '/bridge', label: 'Bridge NFT' },
  { href: '/refuel', label: 'Gas Refuel' },
  { href: '/token', label: 'OFT Bridge' },
  { href: '/messenger', label: 'Messenger' },
  { href: '/gas-station', label: 'Gas Station' },
  { href: '/profile', label: 'Profile' },
  { href: '/contracts', label: 'Contracts' },
  { href: 'https://layerzeroscan.com/protocol/whale', label: 'LayerZero.Scan' },
]

export const FooterNavigation = () => {
  const pathname = usePathname()

  return NAVIGATION.map(({ href, label }) => (
    <Link
      href={href}
      key={href}
      className={cn(
        'hover:text-primary transition-colors flex relative items-center duration-300',
        pathname === href ? 'text-primary' : 'text-foreground',
      )}
    >
      {label}
    </Link>
  ))
}
