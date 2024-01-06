'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
    <section className="max-w-screen-xl mx-auto w-full">
      <h2 className="text-4xl text-foreground text-center font-semibold mb-2">
        FAQ
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map(({ question, answer }, idx) => (
          <AccordionItem value={`item-${idx}`}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
