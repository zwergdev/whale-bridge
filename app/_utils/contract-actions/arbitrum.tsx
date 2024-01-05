import { useContractWrite, useContractRead } from 'wagmi'
import { arbitrumABI } from '../abi/arbitrum'
import { parseEther } from 'viem/utils'
import { truncatedToaster } from '../truncatedToaster'

const ARBITRUM_CONTRACT_ADDR = '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08'

function balanceArbitrum(
  address: `0x${string}`,
  onSuccess: (number: number) => void,
) {
  return useContractRead({
    address: ARBITRUM_CONTRACT_ADDR,
    abi: arbitrumABI,
    functionName: 'balanceOf',
    chainId: 42170,
    args: [address],
    onSuccess(data) {
      onSuccess(Number(data))
    },
  })
}

function mintArbitrum() {
  return useContractWrite({
    address: ARBITRUM_CONTRACT_ADDR,
    abi: arbitrumABI,
    functionName: 'mint',
    chainId: 42170,
    value: parseEther('0'),
    onError(error) {
      truncatedToaster('Error occurred!', error?.message!)
    },
  })
}

function bridgeArbitrum() {
  return useContractWrite({
    address: ARBITRUM_CONTRACT_ADDR,
    abi: arbitrumABI,
    functionName: 'sendFrom',
    chainId: 42170,
    value: parseEther('0.0006'),
    onError(error) {
      truncatedToaster('Error occurred!', error.message)
    },
  })
}

function estimateFeeArbitrum(
  chainTo: number,
  address: `0x${string}`,
  tokenId: bigint,
) {
  return useContractRead({
    address: ARBITRUM_CONTRACT_ADDR,
    abi: arbitrumABI,
    functionName: 'estimateSendFee',
    chainId: 42170,
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

export { balanceArbitrum, mintArbitrum, bridgeArbitrum, estimateFeeArbitrum }
