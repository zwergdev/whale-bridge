import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { DISABLED_PAIRS } from '../_components/chainy/disabled-pairs'
import { CHAINS } from '../_utils/chains'

interface PropsHook {
  // I use any type because every shape has its own type. And each type of form is impossible to register
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
  chain: number | undefined
}

export const useCheckChainTo = ({ watch, setValue, chain }: PropsHook) => {
  const chainFromDefault = watch('chainFrom')
  const chainToDefault = watch('chainTo')
  const isChainDisabled =
    DISABLED_PAIRS[chainFromDefault].includes(chainToDefault)

  if (isChainDisabled) {
    setValue(
      'chainTo',
      CHAINS.filter(({ chainId }) => chainId === chainToDefault)[0]?.value,
    )
  }
  if (watch('chainTo') === undefined || watch('chainTo') === 102) {
    setValue(
      'chainTo',
      CHAINS.filter(({ chainId }) => chainId !== chain)[0].value,
    )
  }
}
