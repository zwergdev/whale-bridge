'use client'

import { HYPERLANE_NAVIGATION_HEADER, NAVIGATION_FOOTER } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const FooterNavigation = () => {
  const pathname = usePathname()

  const definedNavigation = pathname.includes('/hyperlane')
    ? HYPERLANE_NAVIGATION_HEADER
    : NAVIGATION_FOOTER

  return definedNavigation.map(({ href, label }, index) => (
    <Link
      href={href}
      key={index}
      className={cn(
        'hover:text-primary transition-colors flex relative items-center duration-300',
        pathname === href ? 'text-primary' : 'text-foreground',
      )}
    >
      {label}
    </Link>
  ))
}
