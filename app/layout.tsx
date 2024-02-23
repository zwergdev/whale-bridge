import { Footer } from '@/app/_widgets/footer'
import { Header } from '@/app/_widgets/header'
import { WhaleBg } from '@/components/ui/icons'
import { Toaster } from '@/components/ui/sonner'
import '@rainbow-me/rainbowkit/styles.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { headers } from 'next/headers'
import { ContextProvider } from './_providers/web3'
import './globals.css'

const grotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

const title = {
  template: '%s | Whale',
  default: 'Whale', // a default is required when creating a template
}
const description =
  'Multifunctional Omnichain Solution | Bridge & Refuel Powered by LayerZero'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: 'Whale',
    description,
    url: 'https://whale-app.com',
    siteName: 'Whale',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whale',
    description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-background ${grotesk.className}`}>
        <ContextProvider cookie={headers().get('cookie') ?? ''}>
          <div className="flex flex-col w-full items-center justify-center min-h-screen relative overflow-hidden">
            <WhaleBg className="absolute -z-10 left-[-435px] top-28 rotate-[35deg]" />
            <WhaleBg className="absolute -z-10 right-[-247px] top-36 scale-x-[-1] w-[757px] h-auto sm:block hidden" />
            <WhaleBg className="absolute -z-10 right-[-247px] top-36 scale-x-[-1] w-[757px] h-auto sm:block hidden" />
            <Header />
            <main className="container flex flex-col w-full items-center justify-center pb-52 sm:px-8 px-4">
              {children}
              <div className="grow" />
            </main>
            <div className="grow" />
            <Footer />
          </div>
        </ContextProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
