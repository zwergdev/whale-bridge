'use client'

import { NAVIGATION_HEADER } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavigationProps = {
  disableBefore?: boolean
  onClick?: () => void
}

export const Navigation = ({ disableBefore, onClick }: NavigationProps) => {
  const pathname = usePathname()

  return NAVIGATION_HEADER.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      onClick={onClick}
      className={cn(
        'hover:text-primary transition-colors flex relative items-center duration-300',
        pathname === href
          ? 'text-primary before:absolute before:w-full before:h-0.5 before:rounded-t-md before:bottom-[-22.5px] before:left-0 before:content-[""] before:bg-primary'
          : 'text-foreground',
        disableBefore && 'before:hidden',
      )}
    >
      {label}
    </Link>
  ))
}
