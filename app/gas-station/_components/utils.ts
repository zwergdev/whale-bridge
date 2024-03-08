const MAX_AMOUNT_GAS = 100


type FunctionProps = {
  value: number
  label: string
  setValue: any
  selectedChains: { chainId: number; chain: string; amount?: number }[]
}

export function selectChainHandle({
  value,
  label,
  selectedChains,
  setValue,
}: FunctionProps) {
  if (!selectedChains.find(({ chainId }) => chainId === value)) {
    return setValue('selectedChains', [
      ...selectedChains,
      {
        chainId: value,
        chain: label,
      },
    ])
  }
  if (selectedChains.find(({ chainId }) => chainId === value)) {
    return setValue('selectedChains', [
      ...selectedChains.filter(({ chainId }) => chainId !== value),
    ])
  }
}

export function maxAmountHandle({
  value,
  label,
  selectedChains,
  setValue,
}: FunctionProps) {
  if (!selectedChains.find(({ chainId }) => chainId === value)) {
    return setValue('selectedChains', [
      ...selectedChains,
      {
        chainId: value,
        chain: label,
        amount: MAX_AMOUNT_GAS,
      },
    ])
  }
  return setValue(
    'selectedChains',
    selectedChains.map((obj) =>
      obj.chainId === value
        ? {
            ...obj,
            amount: MAX_AMOUNT_GAS,
          }
        : obj,
    ),
  )
}

export function inputAmountHandle({
  value,
  label,
  selectedChains,
  setValue,
  event,
}: FunctionProps & { event: React.ChangeEvent<HTMLInputElement> }) {
  selectedChains.find(({ chainId }) => chainId === value)
    ? setValue(
        'selectedChains',
        selectedChains.map((obj) =>
          obj.chainId === value
            ? {
                ...obj,
                amount: event.target.value
                  ? Number(event.target.value)
                  : undefined,
              }
            : obj,
        ),
      )
    : setValue('selectedChains', [
        ...selectedChains,
        {
          chainId: value,
          chain: label,
          amount: event.target.value ? Number(event.target.value) : undefined,
        },
      ])
}
