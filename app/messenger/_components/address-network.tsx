import { CHAINS } from '@/lib/constants/chains'
import { InfoHover } from '@/app/_components/info-hover'
import {
  Popover,
  PopoverTrigger,
  Label,
  FormControl,
  Button,
} from '@/components/ui'
import { ChevronDown } from '@/components/ui/icons'
import Image from 'next/image'

type AddressNetworkProps = {
  fieldValue: number
  info?: string
  address?: string
  label: string
  children?: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}
export const AddressNetwork = ({
  info,
  address,
  label,
  fieldValue,
  children,
  open,
  onOpenChange,
}: AddressNetworkProps) => {
  return (
    <div className="max-[525px]:w-full w-max lg:w-full max-lg:mx-auto">
      <Label className="leading-10 flex-center">
        {label}
        {info && <InfoHover align="start" desc={info} />}
      </Label>
      <div className="flex h-26 lg:h-10 w-full max-lg:justify-center flex-col lg:flex-row rounded-md border transition-colors duration-300 border-[#0d3b63]/50 bg-paper py-2 lg:pl-3 lg:py-6 text-base font-medium items-center justify-start text-muted-foreground">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap w-full text-center max-lg:px-5">
          {address ?? '0x000000000000000000000000000000000000dead'}
        </p>
        <div className="w-full lg:w-px h-px lg:h-7 shrink-0 max-lg:mb-2 lg:ml-5 opacity-50 max-lg:mt-2 lg:mr-3.5 bg-muted-foreground" />
        <Popover open={open} onOpenChange={onOpenChange}>
          <div className="flex max-lg:w-[250px] w-full">
            <ChainyTrigger selectedValue={fieldValue} />
          </div>
          {children}
        </Popover>
      </div>
    </div>
  )
}

const selectedChain = (fieldValue: number) => {
  const selectedChain = CHAINS.find(({ value }) => value === fieldValue)
  if (!selectedChain) return 'Select chain'
  return (
    <div className="flex-center w-full">
      <Image
        src={selectedChain.image}
        width={32}
        height={32}
        alt="selected-chain-icon"
        className="w-8 h-8 rounded-full"
      />
      <p className="w-full text-xl text-center font-medium">
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
          className="flex h-12 py-0 justify-between w-full text-foreground pl-3 md:pr-5 pr-2 rounded-sm border-none bg-none hover:bg-popover transition-colors duration-300"
        >
          {selectedChain(selectedValue)}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </FormControl>
    </PopoverTrigger>
  )
}
