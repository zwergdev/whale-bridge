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
    address: '0x508DC38DdC611d2225318C2E0Cb19189bE6235C2',
    price: '0.00025',
  }, // bsc
  204: {
    address: '0x2B9769f2c054084B1916E14144C894718e88B460',
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
    address: '0xA911fc39cB3d057c053918a8B042425d4B9cB6a4',
    price: '0.00025',
  }, // arbitrum
  534352: {
    address: '0xB676726A71D2095f39e09cdA48DdE4B35EfbAdf3',
    price: '0.00025',
  }, // scroll
  324: {
    address: '0x00',
    price: '0.00025',
  }, // zkSync
  10: {
    address: '0x8845B2d99995C0D93260b15c46f92d4d34833b21',
    price: '0.00025',
  }, // optimism
  59144: {
    address: '0xA749C357A7EbE70bd0A66777C3a29F144F423156',
    price: '0.00025',
  }, // linea
  8453: {
    address: '0xf7B1f6Cb5c79c002b16a46f4879bDb5EF512A033',
    price: '0.00025',
  }, // base
  1284: {
    address: '0x32756fa5e963Ae1E6F506579fc2867aDA7a73121',
    price: '0.00025',
  }, // moonbeam
  43114: {
    address: '0x3f8e2a5Df911f3e9151423Baa60ca1ef97A04586',
    price: '0.00025',
  }, // avalanche
  250: {
    address: '0xf7B1f6Cb5c79c002b16a46f4879bDb5EF512A033',
    price: '0.00025',
  }, // fantom
  42220: {
    address: '0xE49f67b8B7c8F261fc4b594fb545202f6d52D36f',
    price: '0.00025',
  }, // celo
  100: {
    address: '0x964C0108e4bF9459D900CBf91035183851A7Af55',
    price: '0.00025',
  }, // gnosis
  1101: {
    address: '0x0b16d7aDf25799bD06489fe529541CB671979259',
    price: '0.00025',
  }, // polygon-zk
  82: {
    address: '0x00',
    price: '0.00025',
  }, // meter
  1285: {
    address: '0x51e1cdA8313AA908fC7a324D7059f48Cb21181A5',
    price: '0.00025',
  }, // moonriver
  1666600000: {
    address: '0x4d9Da68465A5Fa08219B6E870c3FaC5f7FAb8909',
    price: '0.00025',
  }, // harmony
  2222: {
    address: '0x1fF5287369E9C449e6eb8ABb891bA1dA3A4684c6',
    price: '0.00025',
  }, // kava
  7777777: {
    address: '0x67B9d86A5E80Ba2400122E94C46C8694F2e30b46',
    price: '0.00025',
  }, // zora
  8217: {
    address: '0x00',
    price: '0.00025',
  }, // klaytn
  1116: {
    address: '0xFC1a815f02B560827f16Cbdb71beF409163B8249',
    price: '0.00025',
  }, // core-dao
  5000: {
    address: '0xAb8C2E9c01803798D9CA53D1f46682809dA107DA',
    price: '0.00025',
  }, // mantle
  122: {
    address: '0x3EEB4a04910f1F18B4260cEC48Ecc8be672ff9B8',
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
