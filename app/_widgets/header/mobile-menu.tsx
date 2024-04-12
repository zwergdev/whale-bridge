'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui'
import { Menu, MobileLogo } from '@/components/ui/icons'
import { HYPERLANE_NAVIGATION_HEADER, NAVIGATION_HEADER } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NavigationLink } from './navigation'

const NavigationSection = ({
  href,
  label,
  links,
  onClick,
}: {
  href: string
  label: string
  links: { href: string; label: string }[]
  onClick?: () => void
}) => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-4">
      <NavigationLink
        href={href}
        label={label}
        disableBefore
        onClick={onClick}
        className="font-bold text-xl"
      />
      {links.map(({ href, label }) => (
        <NavigationLink
          key={href}
          onClick={onClick}
          href={href}
          label={label}
          disableBefore
          isActive={pathname === href}
          className="text-base"
        />
      ))}
    </div>
  )
}

export const MobileMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex-row-center">
        <Menu />
      </SheetTrigger>
      <SheetContent side="top">
        <div className="flex flex-col w-full items-start gap-4 text-xl">
          <Link href="/" onClick={() => setOpen(false)}>
            <MobileLogo className="w-11 h-11" />
          </Link>

          <div className="flex w-full items-start justify-start gap-10">
            <NavigationSection
              href="/hyperlane/mint"
              label="Hyperlane"
              links={HYPERLANE_NAVIGATION_HEADER}
              onClick={() => setOpen(false)}
            />

            <NavigationSection
              href="/"
              label="LayerZero"
              links={NAVIGATION_HEADER}
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
