import { CHAINS } from '@/lib/constants'

interface Props {
  setValue: any
  switchChain: (chainId: number) => void
  chainFrom: number
  chainTo: number
}

export function useCustomSwitchChain({
  setValue,
  chainFrom,
  chainTo,
  switchChain,
}: Props) {
  setValue('chainFrom', chainTo)
  setValue('chainTo', chainFrom)

  const selectedChain = CHAINS.find(({ value }) => value === chainTo)
  if (selectedChain?.chainId) switchChain(selectedChain.chainId)
}
