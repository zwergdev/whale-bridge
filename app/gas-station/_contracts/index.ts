'use client'

import { pack } from '@ethersproject/solidity'
import { parseEther } from 'viem'
import { useReadContract } from 'wagmi'
import { gasAbi } from './gas-abi'

export const GAS_CONTRACTS: {
  [chainId: number]: `0x${string}`
} = {
  42170: '0x00', // arbitrum-nova
  56: '0x00', // bsc
  137: '0x43Ad7e25DCB7aE811722d2FBA721d2A0A2e5E445', // polygon
  42161: '0x00', // arbitrum
  534352: '0x00', // scroll
  324: '0x00', // zkSync
  10: '0x00', // optimism
  59144: '0x00', // linea
  8453: '0x00', // base
  1284: '0x00', // moonbeam
  43114: '0x00', // avalanche
  250: '0x00', // fantom
  42220: '0xEa6c7C4E4eb1fa97D47f16C7ba0abE3F797b2ABa', // celo
  100: '0x4163D84a6725bc2bcDb1bEf325B5A85087DB3be6', // gnosis
  1101: '0x00', // polygon-zk
  82: '0x00', // meter
  1285: '0x00', // moonriver
  1666600000: '0x00', // harmony
  204: '0x00', // op-bnb
  2222: '0x00', // kava
  7777777: '0x00', // zora
  8217: '0x00', // klaytn
  1116: '0x3a5Ab956AC0ae6C4B3C4ee5b0E618E8D5358561a', // core-dao
  5000: '0x00', // mantle
  122: '0x51e1cdA8313AA908fC7a324D7059f48Cb21181A5', // fuse
  1088: '0x00', // metis
  148: '0x00', // shimmer-evm
  0: '0x00',
}

export type ChainParams = {
  [key: string]: {
    v2Value: number
    chainId: string
    valueInEther: string
  }
}

// Estimate
const createReceiveOptions = (gasLimit: bigint) => {
  return pack(
    ['bytes', 'uint8', 'uint16', 'uint8', 'bytes'],
    [pack(['uint16'], [3]), 1, 16 + 1, 1, pack(['uint128'], [gasLimit])],
  )
}

const createNativeOptions = (gasLimit: bigint, amount: bigint, to: string) => {
  return pack(
    ['bytes', 'uint8', 'uint16', 'uint8', 'bytes'],
    [
      createReceiveOptions(gasLimit),
      1,
      32 + 16 + 1,
      2,
      pack(
        ['uint128', 'bytes32'],
        [amount, `0x${to.slice(2).padStart(64, '0')}` as `0x${string}`],
      ),
    ],
  )
}

export const estimateFees = (chain: number, contractParams: ChainParams) => {
  const nullAddress = '0x0000000000000000000000000000000000000000'
  const feeChains: {
    v2Value: number
    chainId: string
  }[] = []
  const options: string[] = []
  const messages: `0x${string}`[] = []

  for (const chain in contractParams) {
    const selection = contractParams[chain]
    feeChains.push({
      v2Value: selection.v2Value,
      chainId: selection.chainId,
    })
    options.push(
      createNativeOptions(
        BigInt(20_000),
        parseEther(selection.valueInEther),
        nullAddress,
      ),
    )
    messages.push('0x')
  }

  const v2Values = feeChains.map((feeChain) => feeChain.v2Value)

  const { data, refetch } = useReadContract({
    address: GAS_CONTRACTS[chain],
    abi: gasAbi,
    functionName: 'estimateFees',
    args: [v2Values, messages, options],
  })

  return { fee: data, refetchFee: refetch }
}

// Deposit
const createOptimizedAdapterParams = (
  dstChainId: bigint,
  nativeAmount: bigint,
) => {
  return (dstChainId << BigInt(224)) | nativeAmount
}

export const writeFillParams = (
  chain: number,
  lzFee: bigint,
  address: string,
  contractParams: ChainParams,
) => {
  const adapterParamsDeposit: bigint[] = []
  for (const chain in contractParams) {
    const selection = contractParams[chain]
    adapterParamsDeposit.push(
      createOptimizedAdapterParams(
        BigInt(selection.v2Value),
        parseEther(selection.valueInEther),
      ),
    )
  }

  return {
    address: GAS_CONTRACTS[chain],
    abi: gasAbi,
    functionName: 'sendDeposits',
    value: lzFee,
    args: [adapterParamsDeposit, address],
  }
}
