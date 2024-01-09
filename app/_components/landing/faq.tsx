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
    question: 'What is c2e?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    question: 'What is W3BZ SDK?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    question: 'What games are planed in the web3BattleZone ecosystem?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    question: 'Is it possible to play for free?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    question: 'Which chain does this game support?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
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
