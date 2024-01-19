'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionWrapper } from './misc'
import { Tail } from '@/components/ui/icons'

const FAQ_ITEMS = [
  {
    question: 'Who are we?',
    answer:
      "We're a platform that allows NFT Minting, bridging and gas Refuel with commitment to empower users to navigate decentralized landscape with unparalleled ease and efficiency of Layerzero technology.",
  },
  {
    question: 'What can you do?',
    answer:
      "On our platform, users can seamlessly bridge assets across ecosystems, mint unique NFTs effortlessly, and optimize their experience with gas refueling capabilities. Whether you're an artist, collector, or blockchain enthusiast.",
  },
  {
    question: 'What technology do we work on?',
    answer:
      'Whale operates on the power of Layerzero Blockchain, this advanced blockchain technology forms the foundation of our platform, ensuring scalability, efficiency, and a seamless user experience for activities such as bridging assets, minting NFTs, and gas refueling.',
  },
  {
    question: 'What else do you plan to develop?',
    answer:
      "According to our roadmap, we're planning to integrate a token bridging feature, sending messages, swap and our own native token.",
  },
  {
    question: 'What networks do we support?',
    answer:
      'Our platform supports an array of blockchain networks, including Scroll, zkSync, BSC, Arbitrum, Arbitrum Nova, and Polygon. As part of our ongoing commitment to innovation, we have ambitious plans to integrate additional networks in the near future.',
  },
]

export const FAQ = () => {
  return (
    <SectionWrapper titleClassName="md:mb-2 mb-0" title="FAQ">
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map(({ question, answer }, idx) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Tail className="absolute -bottom-96 left-10 -z-10" />
    </SectionWrapper>
  )
}
