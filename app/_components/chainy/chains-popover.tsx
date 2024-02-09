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
import Image from 'next/image'
import { DISABLED_PAIRS } from './disabled-pairs'

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
  isChainGridView: boolean
  setIsChainGridView: React.Dispatch<React.SetStateAction<boolean>>
}

const ChainList = ({
  selectedValue,
  fieldValue,
  onSelect,
  disabledChain,
  setIsChainGridView,
  isChainGridView,
}: ChainListProps) => {
  return (
    <PopoverContent className="w-80 p-0">
      <Command>
        <div className="">
          <CommandInput
            setIsChainGridView={setIsChainGridView}
            placeholder="Search chain..."
          />
        </div>
        <CommandEmpty>No chain found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea className="h-[260px]">
            <div className={isChainGridView ? 'w-full flex flex-wrap' : ''}>
              {Array.from(CHAINS)
                .sort((a) => (a.value === fieldValue ? -1 : 0))
                .map(({ label, value, image, chainId }) => {
                  const isDisabled = DISABLED_PAIRS.some(
                    ([a, b]) => selectedValue === a && value === b,
                  )

                  return (
                    <CommandItem
                      className={
                        isChainGridView
                          ? 'hover:bg-popover w-max p-1 rounded-full transition-colors duration-300'
                          : ''
                      }
                      key={value}
                      value={label}
                      image={image}
                      isChainGridView={isChainGridView}
                      disabled={
                        selectedValue === value ||
                        isDisabled ||
                        disabledChain === value
                      }
                      checked={value === fieldValue}
                      onSelect={() => onSelect(value, chainId)}
                    >
                      {isChainGridView ? (
                        <Image
                          src={image}
                          width={30}
                          height={30}
                          alt="chain-image"
                          className="rounded-full"
                        />
                      ) : (
                        label
                      )}
                    </CommandItem>
                  )
                })}
            </div>
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
