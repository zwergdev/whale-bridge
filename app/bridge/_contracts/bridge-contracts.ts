import { parseEther } from 'viem/utils'
import { bridgeABI, celoBridgeABI, modernBridgeABI } from './bridge-abi'

export const BRIDGE_CONTRACTS: {
  [chainId: number]: {
    address: `0x${string}`
  }
} = {
  42170: {
    address: '0x1010a05759a0a7Daa665f12Ec677ff5034Ecd35F',
  }, // arbitrum-nova
  56: {
    address: '0x006E23eb40eBc1805783e3a6c39283bcF5799368',
  }, // bsc
  137: {
    address: '0xE1c907503B8d1545AFD5A89cc44FC1E538A132DA',
  }, // polygon
  42161: {
    address: '0x26E9934024cdC7fcc9f390973d4D9ac1FA954a37',
  }, // arbitrum
  534352: {
    address: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
  }, // scroll
  324: {
    address: '0xF09A71F6CC8DE983dD58Ca474cBC33de43DDEBa9',
  }, // zkSync
  10: {
    address: '0xe87492ae9151769412F40af251d1D2793271e699',
  }, // optimism
  59144: {
    address: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
  }, // linea
  8453: {
    address: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
  }, // base
  1284: {
    address: '0xd709e73c5213Fd291d0BfA55A7D934B741398d96',
  }, // moonbeam
  43114: {
    address: '0x54C71EBBd27520bCbE3E3973a4B579A27035ACD3',
  }, // avalanche
  250: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // fantom
  42220: {
    address: '0xb24b54a2013F4Ff5Df2214559CBF1745C1750b2A',
  }, // celo
  100: {
    address: '0xe9EbD35Ea4aCCb97e0F5BF3CDA31fe3Ac90111Cc',
  }, // gnosis
  1101: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
  }, // polygon-zk
  82: {
    address: '0xfdcac2c2091b3ce88203fb2defb8c9f98edcb904',
  }, // meter
  1285: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
  }, // moonriver
  1666600000: {
    address: '0x36314E3fd0Ff6243e971814613fe73A78f29085E',
  }, // harmony
  204: {
    address: '0x9aeAa45d415fFE75dC4Ba50658584479bAf110Ec',
  }, // op-bnb
  2222: {
    address: '0xBcEe7fB1B98ea4e38Eb52c2E026134d54273ED44',
  }, // kava
  7777777: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // zora
  8217: {
    address: '0xa0d013b84fbaeff5abfc92a412a44572382dca08',
  }, // klaytn
  1116: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // core-dao
  5000: {
    address: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
  }, // mantle
  122: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // fuse
  1088: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  }, // metis
  0: {
    address: '0x00',
  },
}

export function bridgeOpts(chainId: number) {
  return {
    address: BRIDGE_CONTRACTS[chainId].address,
    abi: bridgeABI,
    functionName: 'sendFrom',
    chainId,
    value: parseEther('0.00001'),
  }
}

export function estimateBridgeFeeOpts(
  chainTo: number,
  address: `0x${string}`,
  tokenId: bigint,
  chainId: number,
) {
  return {
    address: BRIDGE_CONTRACTS[chainId].address,
    abi: bridgeABI,
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
  }
}

export function getUserNFTIdsOpts(address: string, chainId: number) {
  return {
    address: BRIDGE_CONTRACTS[chainId].address, // celo & polygon-zk & meter & moonriver
    chainId: chainId,
    abi: celoBridgeABI,
    functionName: 'getUserNFTIds',
    args: [address],
    enabled: false,
  }
}

export function getModernUserNFTIdsOpts(address: string, chainId: number) {
  return {
    address: BRIDGE_CONTRACTS[chainId].address, // opbnb & kava & zora && OTHERS AFTER
    chainId: chainId,
    abi: modernBridgeABI,
    functionName: 'getOwnedNFTs',
    args: [address],
    enabled: false,
  }
}
