'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navigation = () => {
  const pathname = usePathname()

  return ['mint', 'refuel'].map((page) => (
    <Link
      key={page}
      href={`/${page}`}
      className={`hover:text-foreground transition-colors duration-300 ${
        pathname === `/${page}` ? 'text-foreground' : 'text-secondary'
      }`}
    >
      {page.charAt(0).toUpperCase() + page.slice(1)}
    </Link>
  ))
}
