import { Header, Footer } from '@/app/_widgets'
import { WhaleBg } from '@/components/ui/icons'
import { ToasterSonner } from '@/components/ui'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { headers } from 'next/headers'
import { ContextProvider } from './_providers/web3'
import '@rainbow-me/rainbowkit/styles.css'
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
  metadataBase: new URL('https://whale-app.com'),
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
          <div className="flex-col-center w-full min-h-screen relative overflow-hidden">
            <WhaleBg className="absolute -z-10 left-[-435px] top-28 rotate-[35deg]" />
            <WhaleBg className="absolute -z-10 right-[-247px] top-36 scale-x-[-1] w-[757px] h-auto sm:block hidden" />
            <WhaleBg className="absolute -z-10 right-[-247px] top-36 scale-x-[-1] w-[757px] h-auto sm:block hidden" />
            <Header />
            <main className="container flex-col-center w-full pb-52 sm:px-8 px-4">
              {children}
              <div className="grow" />
            </main>
            <div className="grow" />
            <Footer />
          </div>
        </ContextProvider>
        <ToasterSonner />
        <GoogleAnalytics gaId="G-14JT3CWP2G" />
      </body>
    </html>
  )
}
