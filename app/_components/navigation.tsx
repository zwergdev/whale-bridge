'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAVIGATION = [
  { href: '/mint', label: 'Mint' },
  { href: '/bridge', label: 'Bridge' },
  { href: '/refuel', label: 'Refuel' },
]

export const Navigation = () => {
  const pathname = usePathname()

  return NAVIGATION.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={`hover:text-primary transition-colors duration-300 ${
        pathname === href ? 'text-primary' : 'text-foreground'
      }`}
    >
      {label}
    </Link>
  ))
}
