import { pack } from '@ethersproject/solidity'
import { parseEther } from 'viem/utils'
import { refuelABI } from './refuel-abi'

const REFUEL_CONTRACTS: {
  [chainId: number]: {
    address: `0x${string}`
  }
} = {
  42170: {
    address: '0xBe2E226923641Dc4C77583bC71332ecd99597862',
  }, // arbitrum-nova
  56: {
    address: '0x6D096d86F1fE43aed8A073DAd9823C987A450f0e',
  }, // bsc
  137: {
    address: '0x45265fB77A51e3B4ec70142f993F1654A8f7ab32',
  }, // polygon
  42161: {
    address: '0x218de7fAB4310497C2aCf8523d8701b5F2F4D1C7',
  }, // arbitrum
  534352: {
    address: '0xba800cD922F9C4d935fAb96e4a346538bbf29D8c',
  }, // scroll
  324: {
    address: '0x06a2ce74Bc6021851157a003A97D9D8f900543D1',
  }, // zkSync
  10: {
    address: '0x83Ff86c252a41578a7301219Aa23ab6e4F2FdeD3',
  }, // optimism
  59144: {
    address: '0x9aeAa45d415fFE75dC4Ba50658584479bAf110Ec',
  }, // linea
  8453: {
    address: '0x72913DeD90F5Bb415bD74cdccfc944E9887E9790',
  }, // base
  1284: {
    address: '0xb3dd9b6Cd0f14f921E21094c213de746ceE4a2bC',
  }, // moonbeam
  43114: {
    address: '0x3Aa96e35525f15cE0a5521ECBc11B2acD23973CF',
  }, // avalanche
  250: {
    address: '0xb30b4ff71d44C544eDb7A06aceb0008ADa040c78',
  }, // fantom
  42220: {
    address: '0xBcEe7fB1B98ea4e38Eb52c2E026134d54273ED44',
  }, // celo
  100: {
    address: '0x21b3035F2e1C43DF018f2810A321F62f14554209',
  }, // gnosis
  1101: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // polygon-zk
  82: {
    address: '0xf9481cc0d342a0d4d533f77d334a24dfbf1d719d',
  }, // meter
  1285: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // moonriver
  1666600000: {
    address: '0xedc03c234882fa785e7084b2c7e13bc8b7b6a4e3',
  }, // harmony
  204: {
    address: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
  }, // op-bnb
  2222: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // kava
  7777777: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
  }, // zora
  8217: {
    address: '0xbcb4bc8fe7faba16c8a06186ab1703709a24c6bf',
  }, // klaytn
  1116: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
  }, // core-dao
  5000: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
  }, // mantle
  122: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
  }, // fuse
  1088: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
  },
  0: {
    address: '0x00',
  },
}

export function refuelOpts(chainId: number) {
  return {
    address: REFUEL_CONTRACTS[chainId].address,
    abi: refuelABI,
    functionName: 'bridgeGas',
    chainId,
    value: parseEther('0'),
  }
}

export function getRefuelAdapter(amount: bigint, address: string) {
  if (amount === BigInt(0) || !address) return '0'

  return pack(
    ['uint16', 'uint256', 'uint256', 'address'],
    [2, 200000, amount, address],
  )
}

export function estimateRefuelFeeOpts(
  chainTo: number,
  chainId: number,
  address: string,
  amount: number,
) {
  return {
    address: REFUEL_CONTRACTS[chainId].address,
    abi: refuelABI,
    functionName: 'estimateSendFee',
    chainId,
    args: [
      chainTo,
      address, // payload
      getRefuelAdapter(parseEther(amount.toString()), address), // adapter
    ],
    enabled: false,
  }
}
