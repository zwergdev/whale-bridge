import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Header } from './_components/header'
import { Footer } from './_components/footer'
import { Web3Provider } from './_providers/web3'
import { Toaster } from '@/components/ui/sonner'
import { WhaleBg } from '@/components/ui/icons'

const poppins = Poppins({
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

const title = 'Whale'
const description =
  'Multifunctional Omnichain Solution | Bridge & Refuel Powered by LayerZero'

export const metadata: Metadata = {
  metadataBase: new URL('https://whale-app.com'),
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
    siteId: '1654564851425869826',
    creator: '@zwergdev',
    creatorId: '1654564851425869826',
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
      </body>
    </html>
  )
}
