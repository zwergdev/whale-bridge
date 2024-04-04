'use client'

import { HYPERLANE_NAVIGATION_HEADER, NAVIGATION_HEADER } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavigationProps = {
  disableBefore?: boolean
}

export const Navigation = ({ disableBefore }: NavigationProps) => {
  const pathname = usePathname()

  const definedNavigation = pathname.includes('/hyperlane')
    ? HYPERLANE_NAVIGATION_HEADER
    : NAVIGATION_HEADER

  return definedNavigation.map(({ href, label }) => (
    <NavigationLink
      key={href}
      href={href}
      label={label}
      disableBefore={disableBefore}
      isActive={pathname === href}
    />
  ))
}

export const NavigationLink = ({
  href,
  label,
  disableBefore,
  isActive,
  className,
  onClick
}: {
  href: string
  label: string
  disableBefore?: boolean
  isActive?: boolean
  className?: string
  onClick?: () => void
}) => {
  return (
    <Link
      key={href}
      href={href}
      onClick={onClick}
      className={cn(
        'hover:text-primary text-sm transition-colors flex relative items-center duration-300',
        isActive
          ? 'text-primary before:absolute before:w-full before:h-0.5 before:rounded-t-md before:-bottom-3 before:left-0 before:content-[""] before:bg-primary'
          : 'text-foreground',
        disableBefore && 'before:hidden',
        className,
      )}
    >
      {label}
    </Link>
  )
}
