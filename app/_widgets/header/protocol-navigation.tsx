'use client'

import { PROTOCOLS_NAVIGATION } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ProtocolNavigation = () => {
  const pathname = usePathname()

  const isActive = (label: string) => {
    if (pathname.includes('/hyperlane') && label === 'Hyperlane') return true

    return label === 'LayerZero' && !pathname.includes('/hyperlane')
  }

  return (
    <div className="hidden gap-10 xl:flex items-center">
      {PROTOCOLS_NAVIGATION.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'hover:text-primary transition-colors text-base font-bold flex relative items-center duration-300',
            isActive(label) ? 'text-primary' : 'text-foreground',
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
