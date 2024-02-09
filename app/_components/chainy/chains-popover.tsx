import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { FormControl } from '@/components/ui/form'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown, Repeat2 } from 'lucide-react'
import { CHAINS, selectedChain } from '../../_utils/chains'

type ChainyTriggerProps = {
  disabled?: boolean
  selectedValue: number
}
const ChainyTrigger = ({ disabled, selectedValue }: ChainyTriggerProps) => {
  return (
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          disabled={disabled}
          role="combobox"
          variant="clean"
          className="flex justify-between md:w-80 w-60 pl-3 md:pr-5 pr-2 border border-[#0d3b63]/50 bg-paper hover:bg-popover transition-colors duration-300"
        >
          {selectedChain(selectedValue)}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </FormControl>
    </PopoverTrigger>
  )
}

type ChainListProps = {
  selectedValue: number
  fieldValue: number
  onSelect: (value: number, chainId: number) => void
  disabledChain?: number
}

const DISABLED_PAIRS = [
  [175, 214], // nova <-> scroll
  [214, 175], // scroll <-> nova
  [165, 126], // zk <-> moonbeam
  [126, 165], // moonbeam <-> zk
  [125, 165], // celo <-> zk
  [165, 125], // zk <-> celo
  [125, 184], // celo <-> base
  [184, 125], // base <-> celo
  [125, 175], // celo <-> nova
  [175, 125], // nova <-> celo
  [125, 214], // celo <-> scroll
  [214, 125], // scroll <-> celo
  [145, 175], // gnosis <-> nova
  [175, 145], // nova <-> gnosis
  [175, 158], // nova <-> polygon-zk
  [158, 175], // polygon-zk <-> scroll
  [165, 145], // zk <-> gnosis
  // meter
  [176, 125], // meter <-> celo
  [176, 116], // meter <-> harmony
  [176, 158], // meter <-> polygon-zk
  [176, 126], // meter <-> moonbeam
  [176, 167], // meter <-> moonriver
  [176, 145], // meter <-> gnosis
  [176, 214], // meter <-> scroll
  [176, 183], // meter <-> linea
  [125, 176], // celo <-> meter
  [116, 176], // harmony <-> meter
  [158, 176], // polygon-zk <-> meter
  [126, 176], // moonbeam <-> meter
  [167, 176], // moonriver <-> meter
  [145, 176], // gnosis <-> meter
  [214, 176], // scroll <-> meter
  [183, 176], // linea <-> meter
  //harmony
  [116, 176], // harmony <-> meter
  [116, 125], // harmony <-> celo
  [116, 158], // harmony <-> polygon-zk
  [116, 175], // harmony <-> nova
  [116, 167], // harmony <-> moonriver
  [116, 145], // harmony <-> gnosis
  [116, 184], // harmony <-> base
  [116, 214], // harmony <-> scroll
  [116, 165], // harmony <-> zk
  [176, 116], // meter <-> harmony
  [125, 116], // celo <-> harmony
  [158, 116], // polygon-zk <-> harmony
  [175, 116], // nova <-> harmony
  [167, 116], // moonriver <-> harmony
  [145, 116], // gnosis <-> harmony
  [184, 116], // base <-> harmony
  [214, 116], // scroll <-> harmony
  [165, 116], // zk <-> harmony
  // moonriver
  [167, 176], // moonriver <-> meter
  [167, 125], // moonriver <-> celo
  [167, 158], // moonriver <-> polygon-zk
  [167, 175], // moonriver <-> nova
  [167, 145], // moonriver <-> gnosis
  [167, 116], // moonriver <-> harmony
  [167, 126], // moonriver <-> moonbeam
  [167, 165], // moonriver <-> zk
  [176, 167], // meter <-> moonriver
  [125, 167], // celo <-> moonriver
  [158, 167], // polygon-zk <-> moonriver
  [175, 167], // nova <-> moonriver
  [145, 167], // gnosis <-> moonriver
  [116, 167], // harmony <-> moonriver
  [126, 167], // moonbeam <-> moonriver
  [165, 167], // zk <-> moonriver
  // opbnb
  [202, 175], // opbnb <-> nova
  [202, 111], // opbnb <-> optimism
  [202, 126], // opbnb <-> moonbeam
  [202, 125], // opbnb <-> celo
  [202, 145], // opbnb <-> gnosis
  [202, 176], // opbnb <-> meter
  [202, 167], // opbnb <-> moonriver
  [202, 116], // opbnb <-> harmony
  [202, 177], // opbnb <-> kava
  [202, 195], // opbnb <-> zora
  [175, 202], // nova <-> opbnb
  [111, 202], // optimism <-> opbnb
  [126, 202], // moonbeam <-> opbnb
  [125, 202], // celo <-> opbnb
  [145, 202], // gnosis <-> opbnb
  [176, 202], // meter <-> opbnb
  [167, 202], // moonriver <-> opbnb
  [116, 202], // harmony <-> opbnb
  [177, 202], // kava <-> opbnb
  [195, 202], // zora <-> opbnb
  // kava
  [177, 111], // kava <-> optimism
  [177, 125], // kava <-> celo
  [177, 145], // kava <-> gnosis
  [177, 176], // kava <-> meter
  [177, 116], // kava <-> harmony
  [177, 202], // kava <-> opbnb
  [177, 195], // kava <-> zora
  [111, 177], // optimism <-> kava
  [125, 177], // celo <-> kava
  [145, 177], // gnosis <-> kava
  [176, 177], // meter <-> kava
  [116, 177], // harmony <-> kava
  [202, 177], // opbnb <-> kava
  [195, 177], // zora <-> kava
  // zora
  [195, 165], // zora <-> zk
  [195, 175], // zora <-> nova
  [195, 214], // zora <-> scroll
  [195, 111], // zora <-> optimism
  [195, 126], // zora <-> moonbeam
  [195, 112], // zora <-> fantom
  [195, 125], // zora <-> celo
  [195, 145], // zora <-> gnosis
  [195, 158], // zora <-> polygon-zk
  [195, 176], // zora <-> meter
  [195, 167], // zora <-> moonriver
  [195, 116], // zora <-> harmony
  [195, 202], // zora <-> opbnb
  [195, 177], // zora <-> kava
  [165, 195], // zk <-> zora
  [175, 195], // nova <-> zora
  [214, 195], // scroll <-> zora
  [111, 195], // optimism <-> zora
  [126, 195], // moonbeam <-> zora
  [112, 195], // fantom <-> zora
  [125, 195], // celo <-> zora
  [145, 195], // gnosis <-> zora
  [158, 195], // polygon-zk <-> zora
  [176, 195], // meter <-> zora
  [167, 195], // moonriver <-> zora
  [116, 195], // harmony <-> zora
  [202, 195], // opbnb <-> zora
  [177, 195], // kava <-> zora
]

const ChainList = ({
  selectedValue,
  fieldValue,
  onSelect,
  disabledChain,
}: ChainListProps) => {
  return (
    <PopoverContent className="w-80 p-0">
      <Command>
        <CommandInput placeholder="Search chain..." />
        <CommandEmpty>No chain found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea className="h-[260px]">
            {Array.from(CHAINS)
              .sort((a) => (a.value === fieldValue ? -1 : 0))
              .map(({ label, value, image, chainId }) => {
                //
                const isDisabled = DISABLED_PAIRS.some(
                  ([a, b]) => selectedValue === a && value === b,
                )

                return (
                  <CommandItem
                    key={value}
                    value={label}
                    image={image}
                    disabled={
                      selectedValue === value ||
                      isDisabled ||
                      disabledChain === value
                    }
                    checked={value === fieldValue}
                    onSelect={() => onSelect(value, chainId)}
                  >
                    {label}
                  </CommandItem>
                )
              })}
          </ScrollArea>
        </CommandGroup>
      </Command>
    </PopoverContent>
  )
}

const RepeatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Repeat2
      className="stroke-foreground cursor-pointer opacity-75 hover:opacity-100 duration-300 transition-opacity relative md:top-3 top-1"
      onClick={onClick}
    />
  )
}

type PaperProps = {
  title: string
  subtitle?: React.ReactNode
  children: React.ReactNode
}
const Paper = ({ title, children, subtitle }: PaperProps) => {
  return (
    <section className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center pt-40">
      <div className="text-sm text-foreground rounded-md border-popover border max-w-screen-md overflow-hidden w-full p-6 relative bg-[#011e37]/30 backdrop-blur-md flex flex-col">
        <div className="w-32 h-32 -z-10 bg-primary blur-[150px] absolute -bottom-20 left-0" />
        <div className="w-32 h-32 -z-10 bg-primary blur-[200px] absolute -top-20 right-20" />

        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-2xl mb-5">{title}</h2>
          {subtitle}
        </div>
        {children}
      </div>
    </section>
  )
}

export { ChainyTrigger, ChainList, RepeatButton, Paper }
