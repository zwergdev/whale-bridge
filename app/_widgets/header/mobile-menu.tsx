'use client'

import { MobileLogo } from '@/components/ui/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from './navigation'

export const MobileMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center justify-center">
        <Menu />
      </SheetTrigger>
      <SheetContent side="top">
        <div className="flex flex-col w-full items-start gap-4 text-xl">
          <Link href="/" onClick={() => setOpen(false)}>
            <MobileLogo className="w-11 h-11" />
          </Link>
          <Navigation disableBefore onClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
