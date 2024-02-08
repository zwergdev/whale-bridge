'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tail } from '@/components/ui/icons'
import { SectionWrapper } from './misc'

const FAQ_ITEMS = [
  {
    question: 'Who are we?',
    answer:
      "We're a platform that allows NFT Minting, Bridging and Gas Refuel with commitment to empower users to navigate decentralized landscape with unparalleled ease and efficiency of LayerZero technology.",
  },
  {
    question: 'What can you do?',
    answer:
      "On our platform, users can seamlessly bridge assets across ecosystems, mint unique NFTs effortlessly, and optimize their experience with gas refueling capabilities. Whether you're an artist, collector, or blockchain enthusiast.",
  },
  {
    question: 'What technology do we work on?',
    answer:
      'Whale operates on the power of LayerZero Network, this advanced technology forms the foundation of our platform, ensuring scalability, efficiency, and a seamless user experience for activities such as bridging assets, minting NFTs, and gas refueling.',
  },
  {
    question: 'What else do you plan to develop?',
    answer:
      "According to our roadmap, we're planning to integrate a token bridging feature, sending messages and swap.",
  },
  {
    question: 'What networks do we support?',
    answer:
      'Our platform supports an array of blockchain networks, including Scroll, zkSync, BSC, Arbitrum, Arbitrum Nova, Base, Avalanche, Optimism, Linea, Moonbeam, Moonriver, Harmony, Meter, Gnosis, Celo, Fantom and Polygon. As part of our ongoing commitment to innovation, we have ambitious plans to integrate additional networks in the near future.',
  },
]

export const FAQ = () => {
  return (
    <SectionWrapper title="FAQ">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-screen-lg mx-auto mt-2"
      >
        {FAQ_ITEMS.map(({ question, answer }, idx) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent className="max-w-screen-md">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Tail className="absolute -bottom-96 left-10 -z-10" />
    </SectionWrapper>
  )
}
