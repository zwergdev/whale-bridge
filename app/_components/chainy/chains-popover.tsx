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
import Image from 'next/image'
import { CHAINS } from '../../_utils/chains'
import { DISABLED_PAIRS } from './disabled-pairs'

const selectedChain = (fieldValue: number) => {
  const selectedChain = CHAINS.find(({ value }) => value === fieldValue)
  if (!selectedChain) return 'Select chain'
  return (
    <div className="flex items-center w-full">
      <Image
        src={selectedChain.image}
        width={48}
        height={48}
        alt="selected-chain-icon"
        className="md:w-12 md:h-12 w-6 h-6 rounded-full"
      />
      <p className="w-full text-base text-center font-medium">
        {selectedChain.label}
      </p>
    </div>
  )
}

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
    <PopoverContent className="w-80 p-0 bg-transparent border-transparent">
      <Command className="bg-paper border-popover">
        <div>
          <CommandInput
            autoFocus={false}
            setIsChainGridView={setIsChainGridView}
            isChainGridView={isChainGridView}
            placeholder="Search chain..."
          />
        </div>
        <CommandEmpty>No chain found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea className={`${isChainGridView ? 'h-auto' : 'h-[260px]'}`}>
            <div
              className={
                isChainGridView
                  ? 'w-full flex flex-wrap py-1 gap-3 items-center sm:justify-center justify-start'
                  : ''
              }
            >
              {Array.from(CHAINS)
                .sort((a, b) => {
                  const isADisabled =
                    DISABLED_PAIRS[selectedValue]?.includes(a.value) ?? false
                  const isBDisabled =
                    DISABLED_PAIRS[selectedValue]?.includes(b.value) ?? false

                  if (
                    (isADisabled && !isBDisabled) ||
                    selectedValue === a.value ||
                    disabledChain === a.value
                  ) {
                    return 1 // Move chain A to the end
                  }
                  if (
                    (!isADisabled && isBDisabled) ||
                    selectedValue === b.value ||
                    disabledChain === b.value
                  ) {
                    return -1 // Move chain B to the end
                  }
                  return a.value === fieldValue ? -1 : 0
                })
                .map(({ label, value, image, chainId }) => {
                  const isDisabled =
                    DISABLED_PAIRS[selectedValue]?.includes(value) ?? false

                  return (
                    <CommandItem
                      className={
                        isChainGridView ? 'w-max p-1 rounded-full' : ''
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
