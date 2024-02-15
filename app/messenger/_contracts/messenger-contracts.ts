import { pack } from '@ethersproject/solidity'
import { parseEther } from 'viem'
import { messengerABI } from './messenger-abi'

export const MESSENGER_CONTRACTS: {
  [chainId: number]: {
    address: `0x${string}`
    price: string
  }
} = {
  56: {
    address: '0x00',
    price: '0.00025',
  }, // bsc
  204: {
    address: '0x00',
    price: '0.00025',
  }, // op-bnb
  42170: {
    address: '0x8E7A839d0449A25954664D5A35CDbbc6bA0A6f7a',
    price: '0.00025',
  }, // arbitrum-nova
  137: {
    address: '0x3893d483E2DB3D7390dE911fE8FEe878A0f93607',
    price: '0.00025',
  }, // polygon
  42161: {
    address: '0x00',
    price: '0.00025',
  }, // arbitrum
  534352: {
    address: '0x00',
    price: '0.00025',
  }, // scroll
  324: {
    address: '0x00',
    price: '0.00025',
  }, // zkSync
  10: {
    address: '0x00',
    price: '0.00025',
  }, // optimism
  59144: {
    address: '0x00',
    price: '0.00025',
  }, // linea
  8453: {
    address: '0x00',
    price: '0.00025',
  }, // base
  1284: {
    address: '0x00',
    price: '0.00025',
  }, // moonbeam
  43114: {
    address: '0x00',
    price: '0.00025',
  }, // avalanche
  250: {
    address: '0x00',
    price: '0.00025',
  }, // fantom
  42220: {
    address: '0x00',
    price: '0.00025',
  }, // celo
  100: {
    address: '0x00',
    price: '0.00025',
  }, // gnosis
  1101: {
    address: '0x00',
    price: '0.00025',
  }, // polygon-zk
  82: {
    address: '0x00',
    price: '0.00025',
  }, // meter
  1285: {
    address: '0x00',
    price: '0.00025',
  }, // moonriver
  1666600000: {
    address: '0x00',
    price: '0.00025',
  }, // harmony
  2222: {
    address: '0x00',
    price: '0.00025',
  }, // kava
  7777777: {
    address: '0x00',
    price: '0.00025',
  }, // zora
  8217: {
    address: '0x00',
    price: '0.00025',
  }, // klaytn
  1116: {
    address: '0x00',
    price: '0.00025',
  }, // core-dao
  5000: {
    address: '0x00',
    price: '0.00025',
  }, // mantle
  122: {
    address: '0x00',
    price: '0.00025',
  }, // fuse
  0: {
    address: '0x00',
    price: '0.00025',
  },
}

export function sendMessageOpts(chainId: number) {
  return {
    address: MESSENGER_CONTRACTS[chainId].address,
    price: parseEther(MESSENGER_CONTRACTS[chainId].price),
    abi: messengerABI,
    functionName: 'sendMessage',
    chainId,
  }
}

function getMessagePayload(message: string, address: string) {
  if (!message || !address) return '0'

  return pack(['uint8', 'string'], [2, message])
}

export function getMessageDestination(chainTo: number, chainFrom: number) {
  return (
    MESSENGER_CONTRACTS[chainTo].address +
    MESSENGER_CONTRACTS[chainFrom].address.slice(2)
  )
}

export function estimateMessageFeeOpts(
  chainTo: number,
  chainId: number,
  address: string,
  message: string,
) {
  return {
    address: MESSENGER_CONTRACTS[chainId].address,
    abi: messengerABI,
    functionName: 'estimateFees',
    chainId,
    args: [
      chainTo,
      address,
      getMessagePayload(message, address), // _payload
      false,
      pack(['uint16', 'uint'], [2, 250000]), // _adapterParams
    ],
    enabled: false,
  }
}
