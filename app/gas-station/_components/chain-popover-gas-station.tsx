import { CHAINS } from "@/app/_utils/chains"
import Image from "next/image"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { PopoverContent } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'


type ChainListProps = {
  selectedValue: number
  fieldValue: number
  onSelect: (value: number, chainId: number) => void
  isChainGridView: boolean
  setIsChainGridView: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChainListGas = ({
  selectedValue,
  fieldValue,
  onSelect,
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
              {Array.from(CHAINS).map(({ label, value, image, chainId }) => {
                return (
                  <CommandItem
                    className={isChainGridView ? 'w-max p-1 rounded-full' : ''}
                    key={value}
                    value={label}
                    image={image}
                    isChainGridView={isChainGridView}
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