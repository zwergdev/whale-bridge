import { useContractWrite, useContractRead } from 'wagmi'
import { abi } from './abi'
import { parseEther } from 'viem/utils'
import { truncatedToaster } from './truncatedToaster'

const CONTRACTS: {
  [chainId: number]: {
    address: `0x${string}`
    mintPrice: string
  }
} = {
  42170: {
    address: '0x1010a05759a0a7Daa665f12Ec677ff5034Ecd35F',
    mintPrice: '0',
  }, // arbitrum-nova
  56: {
    address: '0x086FBdcE11686E00129C43EBf749503ed1b68Ae4',
    mintPrice: '0',
  }, // bsc
  137: {
    address: '0xE1c907503B8d1545AFD5A89cc44FC1E538A132DA',
    mintPrice: '0.010751115000000',
  }, // polygon
  0: {
    address: '0x00',
    mintPrice: '0',
  },
}

function mint(chainId: number) {
  return useContractWrite({
    address: CONTRACTS[chainId].address,
    abi,
    functionName: 'mint',
    chainId,
    value: parseEther(CONTRACTS[chainId].mintPrice),
    onError(error, ssad) {
      console.log(ssad)

      truncatedToaster('Error occurred!', error?.message!)
    },
  })
}

function bridge(chainId: number) {
  return useContractWrite({
    address: CONTRACTS[chainId].address,
    abi,
    functionName: 'sendFrom',
    chainId,
    value: parseEther('0.00001'),
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
    address: CONTRACTS[chainId].address,
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

export { mint, bridge, estimateFee }
