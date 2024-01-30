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
