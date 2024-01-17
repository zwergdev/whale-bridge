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
    mintAddress: '0x006E23eb40eBc1805783e3a6c39283bcF5799368',
    refuelAddress: '0x6D096d86F1fE43aed8A073DAd9823C987A450f0e',
    mintPrice: '0.0001',
  }, // bsc
  137: {
    mintAddress: '0xE1c907503B8d1545AFD5A89cc44FC1E538A132DA',
    refuelAddress: '0x45265fB77A51e3B4ec70142f993F1654A8f7ab32',
    mintPrice: '0.010751115000000',
  }, // polygon
  42161: {
    mintAddress: '0x26E9934024cdC7fcc9f390973d4D9ac1FA954a37',
    refuelAddress: '0x00000',
    mintPrice: '0.0001',
  }, // arbitrum
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

function getAdapter(amount: number, address: string) {
  const adapter =
    '0x00020000000000000000000000000000000000000000000000000000000000030d40000000000000000000000000000000000000000000000000000'
  const refinedAmount = (Number(parseEther(amount.toString())) / 4096).toString(
    16,
  )
  const slicedAddress = `000${address?.slice(2)}`

  return `${adapter}${refinedAmount}${slicedAddress}`
}

function estimateRefuelFee(
  chainTo: number,
  chainId: number,
  address: string,
  amount: number,
) {
  return useContractRead({
    address: CONTRACTS[chainId].refuelAddress,
    abi: refuelABI,
    functionName: 'estimateSendFee',
    chainId,
    args: [
      chainTo,
      address, // payload
      getAdapter(amount, address), // adapter
    ],
    enabled: false,
  })
}

export {
  mint,
  bridge,
  estimateBridgeFee,
  refuel,
  estimateRefuelFee,
  getAdapter,
}
