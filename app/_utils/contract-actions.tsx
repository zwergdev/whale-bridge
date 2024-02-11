import { ethers } from 'ethers'
import { parseEther } from 'viem/utils'
import { celoMintABI, mintABI, modernMintABI, refuelABI } from './abi'

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
    mintPrice: '0.29751115000000',
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
  1284: {
    mintAddress: '0xd709e73c5213Fd291d0BfA55A7D934B741398d96',
    refuelAddress: '0xb3dd9b6Cd0f14f921E21094c213de746ceE4a2bC',
    mintPrice: '0.5426824587',
  }, // moonbeam
  43114: {
    mintAddress: '0x54C71EBBd27520bCbE3E3973a4B579A27035ACD3',
    refuelAddress: '0x3Aa96e35525f15cE0a5521ECBc11B2acD23973CF',
    mintPrice: '0.0068824587',
  }, // avalanche
  250: {
    mintAddress: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    refuelAddress: '0xb30b4ff71d44C544eDb7A06aceb0008ADa040c78',
    mintPrice: '0.616824587',
  }, // fantom
  42220: {
    mintAddress: '0xb24b54a2013F4Ff5Df2214559CBF1745C1750b2A',
    refuelAddress: '0xBcEe7fB1B98ea4e38Eb52c2E026134d54273ED44',
    mintPrice: '0.32',
  }, // celo
  100: {
    mintAddress: '0xe9EbD35Ea4aCCb97e0F5BF3CDA31fe3Ac90111Cc',
    refuelAddress: '0x21b3035F2e1C43DF018f2810A321F62f14554209',
    mintPrice: '0.226824587',
  }, // gnosis
  1101: {
    mintAddress: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    refuelAddress: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    mintPrice: '0.0001',
  }, // polygon-zk
  82: {
    mintAddress: '0xfdcac2c2091b3ce88203fb2defb8c9f98edcb904',
    refuelAddress: '0xf9481cc0d342a0d4d533f77d334a24dfbf1d719d',
    mintPrice: '0.2017543859649123',
  }, // meter
  1285: {
    mintAddress: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    refuelAddress: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    mintPrice: ' 0.010608856088560886',
  }, // moonriver
  1666600000: {
    mintAddress: '0x36314E3fd0Ff6243e971814613fe73A78f29085E',
    refuelAddress: '0xedc03c234882fa785e7084b2c7e13bc8b7b6a4e3',
    mintPrice: '16.546762589928058000',
  }, // harmony
  204: {
    mintAddress: '0x9aeAa45d415fFE75dC4Ba50658584479bAf110Ec',
    refuelAddress: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
    mintPrice: '0.0007191320',
  }, // op-bnb
  2222: {
    mintAddress: '0xBcEe7fB1B98ea4e38Eb52c2E026134d54273ED44',
    refuelAddress: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    mintPrice: '0.31',
  }, // kava
  7777777: {
    mintAddress: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    refuelAddress: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    mintPrice: '0.0001',
  }, // zora
  8217: {
    mintAddress: '0xa0d013b84fbaeff5abfc92a412a44572382dca08',
    refuelAddress: '0xbcb4bc8fe7faba16c8a06186ab1703709a24c6bf',
    mintPrice: '1.05',
  }, // klaytn
  1116: {
    mintAddress: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    refuelAddress: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    mintPrice: '0.4273',
  }, // core-dao
  5000: {
    mintAddress: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
    refuelAddress: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    mintPrice: '0.3499'
  }, // mantle
  122: {
    mintAddress: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    refuelAddress: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    mintPrice: '3.70866',
  }, // fuse
  0: {
    mintAddress: '0x00',
    refuelAddress: '0x00',
    mintPrice: '0',
  },
}

function mint(chainId: number) {
  return {
    address: CONTRACTS[chainId].mintAddress,
    abi: mintABI,
    functionName: 'mint',
    chainId,
    value: parseEther(CONTRACTS[chainId].mintPrice),
  }
}

function bridge(chainId: number) {
  return {
    address: CONTRACTS[chainId].mintAddress,
    abi: mintABI,
    functionName: 'sendFrom',
    chainId,
    value: parseEther('0.00001'),
  }
}

function estimateBridgeFee(
  chainTo: number,
  address: `0x${string}`,
  tokenId: bigint,
  chainId: number,
) {
  return {
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
  }
}

function refuel(chainId: number) {
  return {
    address: CONTRACTS[chainId].refuelAddress,
    abi: refuelABI,
    functionName: 'bridgeGas',
    chainId,
    value: parseEther('0'),
  }
}

function getAdapter(amount: bigint, address: string) {
  if (amount === BigInt(0) || !address) return '0'
  if (amount === BigInt(0) || !address) return '0'

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
  return {
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
  }
}

function getUserNFTIds(address: string, chainId: number) {
  return {
    address: CONTRACTS[chainId].mintAddress, // celo & polygon-zk & meter & moonriver
    chainId: chainId,
    abi: celoMintABI,
    functionName: 'getUserNFTIds',
    args: [address],
    enabled: false,
  }
}

function getModernUserNFTIds(address: string, chainId: number) {
  return {
    address: CONTRACTS[chainId].mintAddress, // opbnb & kava & zora
    chainId: chainId,
    abi: modernMintABI,
    functionName: 'getOwnedNFTs',
    args: [address],
    enabled: false,
  }
}

function getNextMintId(chainId: number) {
  return {
    address: CONTRACTS[chainId].mintAddress,
    chainId: chainId,
    abi: mintABI,
    functionName: 'nextMintId',
    enabled: false,
  }
}

export {
  mint,
  bridge,
  estimateBridgeFee,
  refuel,
  estimateRefuelFee,
  getAdapter,
  getUserNFTIds,
  getModernUserNFTIds,
  getNextMintId,
  CONTRACTS,
}
