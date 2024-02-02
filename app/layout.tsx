import { WhaleBg } from '@/components/ui/icons'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Web3Provider } from './_providers/web3'
import './globals.css'

const poppins = Poppins({
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const title = 'Whale'
const description =
  'Multifunctional Omnichain Solution | Bridge & Refuel Powered by LayerZero'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://whale-app.com',
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
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
      <body className={`bg-background ${poppins.className}`}>
        <Web3Provider>
          <div className="flex flex-col w-full items-center justify-center min-h-screen relative overflow-hidden">
            <WhaleBg className="absolute -z-10 left-[-435px] top-28 rotate-[35deg]" />
            <WhaleBg className="absolute -z-10 right-[-247px] top-36 scale-x-[-1] w-[757px] h-auto" />
            <Header />
            <main className="container flex flex-col w-full items-center justify-center pt-36 pb-52">
              {children}
              <div className="grow" />
            </main>
            <div className="grow" />
            <Footer />
          </div>
        </Web3Provider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
