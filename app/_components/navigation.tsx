'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAVIGATION = [
  { href: '/mint', label: 'Mint / Bridge' },
  { href: '/refuel', label: 'Refuel' },
]

export const Navigation = () => {
  const pathname = usePathname()

  return NAVIGATION.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      className={`hover:text-[#07DEFB] transition-colors duration-300 ${
        pathname === href ? 'text-[#07DEFB]' : 'text-foreground'
      }`}
    >
      {label}
    </Link>
  ))
}
