import { Button } from '@/components/ui/button'
import { ChevronDown, Repeat2 } from 'lucide-react'
import { FormControl } from '@/components/ui/form'
import { PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { selectedChain, CHAINS } from '../../_utils/chains'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

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
  onSelect: (value: number) => void
}
const ChainList = ({ selectedValue, fieldValue, onSelect }: ChainListProps) => {
  return (
    <PopoverContent className="w-80 p-0">
      <Command>
        <CommandInput placeholder="Search chain..." />
        <CommandEmpty>No chain found.</CommandEmpty>
        <CommandGroup>
          {CHAINS.map(({ label, value, image }) => (
            <CommandItem
              value={label}
              key={value}
              image={image}
              disabled={selectedValue === value}
              checked={value === fieldValue}
              onSelect={() => onSelect(value)}
            >
              {label}
            </CommandItem>
          ))}
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
  children: React.ReactNode
  icon?: React.ReactNode
}
const Paper = ({ title, children, icon }: PaperProps) => {
  return (
    <section className="text-sm text-foreground rounded-md max-w-screen-md w-full px-6 pt-8 pb-10 bg-paper flex flex-col">
      <div className="flex justify-between">
        <h2 className="font-semibold text-2xl mb-5">{title}</h2>
        {icon}
      </div>
      {children}
    </section>
  )
}

export { ChainyTrigger, ChainList, RepeatButton, Paper }
