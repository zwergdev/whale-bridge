import { useContractWrite, useContractRead } from 'wagmi'
import { mintABI, refuelABI } from './abi'
import { parseEther } from 'viem/utils'
import { truncatedToaster } from './truncatedToaster'

const CONTRACTS: {
  [chainId: number]: {
    mintAddress: `0x${string}`
    refuelAddress: `0x${string}`
    mintPrice: string
  }
} = {
  42170: {
    mintAddress: '0x1010a05759a0a7Daa665f12Ec677ff5034Ecd35F',
    refuelAddress: '0xBe2E226923641Dc4C77583bC71332ecd99597862',
    mintPrice: '0',
  }, // arbitrum-nova
  56: {
    mintAddress: '0x086FBdcE11686E00129C43EBf749503ed1b68Ae4',
    refuelAddress: '0x6D096d86F1fE43aed8A073DAd9823C987A450f0e',
    mintPrice: '0',
  }, // bsc
  137: {
    mintAddress: '0xE1c907503B8d1545AFD5A89cc44FC1E538A132DA',
    refuelAddress: '0x45265fB77A51e3B4ec70142f993F1654A8f7ab32',
    mintPrice: '0.010751115000000',
  }, // polygon
  0: {
    mintAddress: '0x00',
    refuelAddress: '0x00',
    mintPrice: '0',
  },
}

function mint(chainId: number) {
  return useContractWrite({
    address: CONTRACTS[chainId].mintAddress,
    abi: mintABI,
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
    address: CONTRACTS[chainId].mintAddress,
    abi: mintABI,
    functionName: 'sendFrom',
    chainId,
    value: parseEther('0.00001'),
    onError(error) {
      truncatedToaster('Error occurred!', error.message)
    },
  })
}

function estimateBridgeFee(
  chainTo: number,
  address: `0x${string}`,
  tokenId: bigint,
  chainId: number,
) {
  return useContractRead({
    address: CONTRACTS[chainId].mintAddress,
    abi: mintABI,
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

function refuel(chainId: number) {
  return useContractWrite({
    address: CONTRACTS[chainId].refuelAddress,
    abi: refuelABI,
    functionName: 'bridgeGas',
    chainId,
    value: parseEther('0'),
    onError(error) {
      truncatedToaster('Error occurred!', error.message)
    },
  })
}

function estimateRefuelFee(chainTo: number, chainId: number) {
  return useContractRead({
    address: CONTRACTS[chainId].refuelAddress,
    abi: refuelABI,
    functionName: 'estimateSendFee',
    chainId,
    args: [
      chainTo,
      '0x00010000000000000000000000000000000000000000000000000000000000030d40', // payload
      '0x00010000000000000000000000000000000000000000000000000000000000030d40', // adapter
    ],
    enabled: true,
  })
}

export { mint, bridge, estimateBridgeFee, refuel, estimateRefuelFee }
