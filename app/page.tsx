import { Hero } from './_components/landing/hero'
import { Articles } from './_components/landing/articles'
import { Roadmap } from './_components/landing/roadmap'
import { FAQ } from './_components/landing/faq'

export default function Home() {
  return (
    <>
      <Hero />
      <Articles />
      <Roadmap />
      <FAQ />
    </>
  )
}
