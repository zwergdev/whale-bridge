import { CHAINS } from '@/app/_utils/chains'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

export function ChainPopoverGasStation({
  onSelect,
  selectedChain,
}: { onSelect: (chainId: number) => void; selectedChain: number }) {
  const chain = CHAINS.find(({ chainId }) => chainId === selectedChain)!
  return (
    <>
      <Popover >
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant="clean"
            className="w-full flex items-center rounded-md justify-start border border-ring bg-[#011e37]/30 p-2 relative"
          >
            <Image
              src={chain?.image}
              width={48}
              height={48}
              alt="selected-chain-icon"
              className="md:w-10 md:h-10 w-6 h-6 rounded-full"
            />
            <p className="text-base text-center font-medium mx-auto mr-32">
              {chain?.label}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 bg-transparent border-transparent">
          <Command className="bg-paper border-popover">
            <div>
              <CommandInput autoFocus={false} placeholder="Search Chain..." />
            </div>
            <CommandEmpty>No chain found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[260px]">
                <div>
                  {Array.from(CHAINS)
                    .sort((a, b) => {
                      if (chain.label === a.label) {
                        return 1
                      }
                      if (chain.label === b.label) {
                        return -1
                      }
                      return chain.label === a.label ? -1 : 0
                    })
                    .map(({ label, image, chainId }) => (
                      <CommandItem
                        key={label}
                        image={image}
                        value={label}
                        onSelect={() => onSelect(chainId)}
                        disabled={label === chain.label}
                        checked={label === chain.label}
                      >
                        {label}
                      </CommandItem>
                    ))}
                </div>
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
