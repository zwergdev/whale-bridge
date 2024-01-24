import { useContractWrite, useContractRead } from 'wagmi'
import { mintABI, refuelABI } from './abi'
import { parseEther } from 'viem/utils'
import { ethers } from 'ethers'

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
    mintPrice: '0.0001',
  }, // arbitrum-nova
  56: {
    mintAddress: '0x006E23eb40eBc1805783e3a6c39283bcF5799368',
    refuelAddress: '0x6D096d86F1fE43aed8A073DAd9823C987A450f0e',
    mintPrice: '0.00076824587',
  }, // bsc
  137: {
    mintAddress: '0xE1c907503B8d1545AFD5A89cc44FC1E538A132DA',
    refuelAddress: '0x45265fB77A51e3B4ec70142f993F1654A8f7ab32',
    mintPrice: '0.377511150000000',
  }, // polygon
  42161: {
    mintAddress: '0x26E9934024cdC7fcc9f390973d4D9ac1FA954a37',
    refuelAddress: '0x218de7fAB4310497C2aCf8523d8701b5F2F4D1C7',
    mintPrice: '0.0001',
  }, // arbitrum
  534352: {
    mintAddress: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
    refuelAddress: '0xba800cD922F9C4d935fAb96e4a346538bbf29D8c',
    mintPrice: '0.0001',
  }, // scroll
  324: {
    mintAddress: '0xF09A71F6CC8DE983dD58Ca474cBC33de43DDEBa9',
    refuelAddress: '0x06a2ce74Bc6021851157a003A97D9D8f900543D1',
    mintPrice: '0.0001',
  }, // zkSync
  10: {
    mintAddress: '0xe87492ae9151769412F40af251d1D2793271e699',
    refuelAddress: '0x83Ff86c252a41578a7301219Aa23ab6e4F2FdeD3',
    mintPrice: '0.0001',
  }, // optimism
  59144: {
    mintAddress: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
    refuelAddress: '0x9aeAa45d415fFE75dC4Ba50658584479bAf110Ec',
    mintPrice: '0.0001',
  }, // linea
  8453: {
    mintAddress: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
    refuelAddress: '0x72913DeD90F5Bb415bD74cdccfc944E9887E9790',
    mintPrice: '0.0001',
  }, // base
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
    onError(error) {
      console.error(error.message)
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
      console.error(error.message)
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
      console.error(error.message)
    },
  })
}

function getAdapter(amount: bigint, address: string) {
  if (amount === BigInt(0)) return '0'

  return ethers.utils.solidityPack(
    ['uint16', 'uint256', 'uint256', 'address'],
    [2, 200000, amount, address],
  )
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
      getAdapter(parseEther(amount.toString()), address), // adapter
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
