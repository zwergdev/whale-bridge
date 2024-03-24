'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui'
import { Tail } from '@/components/ui/icons'
import { SectionWrapper } from './misc'

const FAQ_ITEMS = [
  {
    question: 'Who are we?',
    answer:
      "We're a platform that allows NFT Minting, Bridging, Gas Refuel, Token Claiming and Messaging with commitment to empower users to navigate decentralized landscape with unparalleled ease and efficiency of LayerZero technology.",
  },
  {
    question: 'What can you do?',
    answer:
      'On our platform, users can seamlessly bridge assets across networks, mint NFTs effortlessly, and optimize their experience with gas refueling capabilities.',
  },
  {
    question: 'What technology do we work on?',
    answer:
      'Whale operates on the power of LayerZero Network, this advanced technology forms the foundation of our platform, ensuring scalability, efficiency, and a seamless user experience for activities such as bridging assets, minting NFTs, and gas refueling.',
  },
  {
    question: 'How secure is out protocol?',
    answer:
      'We are officially verified by LayerZero Scan. All our contracts have been verified and are publicly available. A list of all our contracts can be found on the Contracts tab.',
  },
  {
    question: 'What networks do we support?',
    answer:
      'Our platform supports an array of blockchain networks, including BSC, zkSync, Base, Linea, Arbitrum Nova, Polygon, Arbitrum, Scroll, Optimism, Moonbeam, Avalanche, Fantom, Celo, Gnosis, Polygon zkEVM, Meter, Moonriver, Harmony, opBNB, KAVA, Zora, Klaytn, Mantle, CoreDAO, Fuse, Metis and ShimmerEVM. As part of our ongoing commitment to innovation, we have ambitious plans to integrate additional networks in the near future.',
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
