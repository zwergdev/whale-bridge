import { CHAINS } from '@/app/_utils/chains'
import { InfoHover } from '@/app/token/_components/info-hover'
import { Button } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown } from 'lucide-react'
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
    <div className="w-full">
      <Label className="leading-10 flex items-center">
        {label}
        {info && <InfoHover align="start" desc={info} />}
      </Label>
      <div className="flex h-10 w-full rounded-md border transition-colors duration-300 border-[#0d3b63]/50 bg-paper pl-3 py-6 text-base font-medium items-center justify-start text-muted-foreground">
        {address ?? '0x000000000000000000000000000000000000dead'}
        <div className="w-px h-7 shrink-0 ml-5 opacity-50 mr-3.5 bg-muted-foreground" />
        <Popover open={open} onOpenChange={onOpenChange}>
          <ChainyTrigger selectedValue={fieldValue} />
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
    <div className="flex items-center w-full">
      <Image
        src={selectedChain.image}
        width={28}
        height={28}
        alt="selected-chain-icon"
        className="w-7 h-7 rounded-full"
      />
      <p className="w-full text-lg text-center font-medium">
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
