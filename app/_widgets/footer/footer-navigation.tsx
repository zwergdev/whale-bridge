'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVIGATION_FOOTER } from '@/lib/constants'

export const FooterNavigation = () => {
  const pathname = usePathname()

  return NAVIGATION_FOOTER.map(({ href, label }, index) => (
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
