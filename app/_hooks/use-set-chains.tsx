import { DISABLED_PAIRS, CHAINS } from '@/lib/constants'
import { UseFormWatch } from 'react-hook-form'

interface PropsHookChainTo {
  watch?: UseFormWatch<any>
  chain: number | undefined
}

interface PropsHookChainFrom {
  chain: number | undefined
}

export const useSetChainFrom = ({ chain }: PropsHookChainFrom) => {
  return CHAINS.find(({ chainId }) => chainId === chain)?.value ?? 175
}

export const useCheckChainTo = ({ watch, chain }: PropsHookChainTo) => {
  console.log(!watch)
  if (!watch) return CHAINS.filter(({ chainId }) => chainId !== chain)[0].value

  const chainFromDefault = watch('chainFrom')
  const chainToDefault = watch('chainTo')
  const isChainDisabled =
    DISABLED_PAIRS[chainFromDefault].includes(chainToDefault)

  if (isChainDisabled) {
    return CHAINS.filter(({ chainId }) => chainId === chainToDefault)[0]?.value
  }
  if (watch('chainTo') === undefined || watch('chainTo') === 102) {
    return CHAINS.filter(({ chainId }) => chainId !== chain)[0].value
  }
}
