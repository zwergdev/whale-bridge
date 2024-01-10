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
  'Elit. Hac ornare lorem mattis lorem efficitur amet, sed platea cursus vel molestie non dictum.'

export const metadata: Metadata = {
  metadataBase: new URL('https://whale-bridge.vercel.app'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://ragate.vercel.app',
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
            <main className="container flex flex-col w-full items-center justify-center pt-12 pb-52">
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
