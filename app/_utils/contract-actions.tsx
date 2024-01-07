import { useContractWrite, useContractRead } from 'wagmi'
import { abi } from './abi'
import { parseEther } from 'viem/utils'
import { truncatedToaster } from './truncatedToaster'

const CONTRACTS: { [chainId: number]: `0x${string}` } = {
  42170: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08', // arbitrum-nova
  56: '0xa930241019d1e9b2d246Ba34c54DFcF5a9573179', // bsc
}

type BalanceParams = {
  address?: `0x${string}`
  onSuccess: (number: number) => void
  chainId: number
}

function balance({ address, onSuccess, chainId }: BalanceParams) {
  if (!address) return
  return useContractRead({
    address: CONTRACTS[chainId],
    abi,
    functionName: 'balanceOf',
    chainId,
    args: [address],
    onSuccess(data) {
      onSuccess(Number(data))
    },
  })
}

function mint(chainId: number) {
  return useContractWrite({
    address: CONTRACTS[chainId],
    abi,
    functionName: 'mint',
    chainId,
    value: parseEther('0'),
    onError(error) {
      truncatedToaster('Error occurred!', error?.message!)
    },
  })
}

function bridge(chainId: number) {
  return useContractWrite({
    address: CONTRACTS[chainId],
    abi,
    functionName: 'sendFrom',
    chainId,
    value: parseEther('0.0006'),
    onError(error) {
      truncatedToaster('Error occurred!', error.message)
    },
  })
}

function estimateFee(
  chainTo: number,
  address: `0x${string}`,
  tokenId: bigint,
  chainId: number,
) {
  return useContractRead({
    address: CONTRACTS[chainId],
    abi,
    functionName: 'estimateSendFee',
    chainId,
    args: [
      chainTo,
      address,
      tokenId,
      false,
      '0x00010000000000000000000000000000000000000000000000000000000000030d40',
    ],
    enabled: false,
  })
}

export { balance, mint, bridge, estimateFee }
