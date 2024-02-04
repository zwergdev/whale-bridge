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
          className="flex justify-between md:w-80 w-60 pl-3 md:pr-5 pr-2 bg-popover hover:bg-popover-light transition-colors duration-300"
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
  // meter
  [176, 125], // meter <-> celo
  [176, 116], // meter <-> harmony
  [176, 158], // meter <-> polygon-zk
  [176, 126], // meter <-> moonbeam
  [176, 167], // meter <-> moonriver
  [176, 145], // meter <-> gnosis
  [176, 184], // meter <-> base
  [176, 214], // meter <-> scroll
  [176, 183], // meter <-> linea
  [125, 176], // celo <-> meter
  [116, 176], // harmony <-> meter
  [158, 176], // polygon-zk <-> meter
  [126, 176], // moonbeam <-> meter
  [167, 176], // moonriver <-> meter
  [145, 176], // gnosis <-> meter
  [184, 176], // base <-> meter
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
  [176, 116], // meter <-> harmony
  [125, 116], // celo <-> harmony
  [158, 116], // polygon-zk <-> harmony
  [175, 116], // nova <-> harmony
  [167, 116], // moonriver <-> harmony
  [145, 116], // gnosis <-> harmony
  [184, 116], // base <-> harmony
  [214, 116], // scroll <-> harmony
  // moonriver
  [167, 176], // moonriver <-> meter
  [167, 125], // moonriver <-> celo
  [167, 158], // moonriver <-> polygon-zk
  [167, 175], // moonriver <-> nova
  [167, 145], // moonriver <-> gnosis
  [167, 116], // moonriver <-> harmony
  [167, 126], // moonriver <-> moonbeam
  [176, 167], // meter <-> moonriver
  [125, 167], // celo <-> moonriver
  [158, 167], // polygon-zk <-> moonriver
  [175, 167], // nova <-> moonriver
  [145, 167], // gnosis <-> moonriver
  [116, 167], // harmony <-> moonriver
  [126, 167], // moonbeam <-> moonriver
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
    <section className="text-sm text-foreground rounded-md max-w-screen-md w-full px-6 pt-8 pb-10 bg-paper flex flex-col">
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-2xl mb-5">{title}</h2>
        {subtitle}
      </div>
      {children}
    </section>
  )
}

export { ChainyTrigger, ChainList, RepeatButton, Paper }
