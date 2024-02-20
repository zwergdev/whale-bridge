import { parseEther } from 'viem/utils'
import { mintABI } from './mint-abi'

export const MINT_CONTRACTS: {
  [chainId: number]: {
    address: `0x${string}`
    price: number
  }
} = {
  42170: {
    address: '0x1010a05759a0a7Daa665f12Ec677ff5034Ecd35F',
    price: 0.0001,
  }, // arbitrum-nova
  56: {
    address: '0x006E23eb40eBc1805783e3a6c39283bcF5799368',
    price: 0.00076824587,
  }, // bsc
  137: {
    address: '0xE1c907503B8d1545AFD5A89cc44FC1E538A132DA',
    price: 0.29751115,
  }, // polygon
  42161: {
    address: '0x26E9934024cdC7fcc9f390973d4D9ac1FA954a37',
    price: 0.0001,
  }, // arbitrum
  534352: {
    address: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
    price: 0.0001,
  }, // scroll
  324: {
    address: '0xF09A71F6CC8DE983dD58Ca474cBC33de43DDEBa9',
    price: 0.0001,
  }, // zkSync
  10: {
    address: '0xe87492ae9151769412F40af251d1D2793271e699',
    price: 0.0001,
  }, // optimism
  59144: {
    address: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
    price: 0.0001,
  }, // linea
  8453: {
    address: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
    price: 0.0001,
  }, // base
  1284: {
    address: '0xd709e73c5213Fd291d0BfA55A7D934B741398d96',
    price: 0.5426824587,
  }, // moonbeam
  43114: {
    address: '0x54C71EBBd27520bCbE3E3973a4B579A27035ACD3',
    price: 0.0068824587,
  }, // avalanche
  250: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    price: 0.616824587,
  }, // fantom
  42220: {
    address: '0xb24b54a2013F4Ff5Df2214559CBF1745C1750b2A',
    price: 0.32,
  }, // celo
  100: {
    address: '0xe9EbD35Ea4aCCb97e0F5BF3CDA31fe3Ac90111Cc',
    price: 0.226824587,
  }, // gnosis
  1101: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    price: 0.0001,
  }, // polygon-zk
  82: {
    address: '0xfdcac2c2091b3ce88203fb2defb8c9f98edcb904',
    price: 0.2017543859649123,
  }, // meter
  1285: {
    address: '0xeDc03C234882FA785e7084B2C7E13BC8b7B6a4e3',
    price: 0.010608856088560886,
  }, // moonriver
  1666600000: {
    address: '0x36314E3fd0Ff6243e971814613fe73A78f29085E',
    price: 16.546762589928058,
  }, // harmony
  204: {
    address: '0x9aeAa45d415fFE75dC4Ba50658584479bAf110Ec',
    price: 0.000719132,
  }, // op-bnb
  2222: {
    address: '0xBcEe7fB1B98ea4e38Eb52c2E026134d54273ED44',
    price: 0.31,
  }, // kava
  7777777: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    price: 0.0001,
  }, // zora
  8217: {
    address: '0xa0d013b84fbaeff5abfc92a412a44572382dca08',
    price: 1.05,
  }, // klaytn
  1116: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    price: 0.4273,
  }, // core-dao
  5000: {
    address: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
    price: 0.3499,
  }, // mantle
  122: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    price: 3.70866,
  }, // fuse
  1088: {
    address: '0x82d5a068ba58ad31c419275474333B8696B3641d',
    price: 0.0026,
  }, // metis
  0: {
    address: '0x00',
    price: 0,
  },
}

export function mint(chainId: number) {
  return {
    address: MINT_CONTRACTS[chainId].address,
    abi: mintABI,
    functionName: 'mint',
    chainId,
    value: parseEther(MINT_CONTRACTS[chainId].price.toString()),
  }
}

export function getNextMintIdOpts(chainId: number) {
  return {
    address: MINT_CONTRACTS[chainId].address,
    chainId,
    abi: mintABI,
    functionName: 'nextMintId',
    enabled: false,
  }
}
