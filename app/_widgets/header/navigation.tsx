'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAVIGATION = [
  { href: '/mint', label: 'Mint', isNew: false },
  { href: '/bridge', label: 'Bridge', isNew: false },
  { href: '/refuel', label: 'Refuel', isNew: false },
  { href: '/profile', label: 'Profile', isNew: false },
]

type NavigationProps = {
  isFooter?: boolean
  onClick?: () => void
}

export const Navigation = ({ isFooter, onClick }: NavigationProps) => {
  const pathname = usePathname()

  return NAVIGATION.map(({ href, label, isNew }) => (
    <Link
      key={href}
      href={href}
      onClick={onClick}
      className={cn(
        'hover:text-primary transition-colors flex relative items-center duration-300',
        pathname === href
          ? 'text-primary before:absolute before:w-full before:h-0.5 before:rounded-t-md before:bottom-[-22.5px] before:left-0 before:content-[""] before:bg-primary'
          : 'text-foreground',
        isFooter && 'before:hidden',
      )}
    >
      {isNew && !isFooter && (
        <div
          className="absolute -right-3.5 -top-3.5 text-[10px] leading-none bg-yellow-500 animate-pulse px-1.5 py-0.5 rounded hover:text-foreground text-foreground font-bold"
          style={{ boxShadow: '0 0 8px yellow' }}
        >
          NEW
        </div>
      )}
      {label}
    </Link>
  ))
}