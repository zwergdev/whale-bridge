import { tokenABI } from './token-abi'

export const TOKEN_CONTRACTS: {
  [chainId: number]: {
    address: `0x${string}`
    price: number
  }
} = {
  56: {
    address: '0x408bE6A5C550913B46B8FA9196c122083811Be96',
    price: 0.0000025,
  }, // bsc
  204: {
    address: '0xb9F2BEE223C9c7BEAc8d7517d950DBdC19Bf8680',
    price: 0.0000025,
  }, // op-bnb
  42170: {
    address: '0x7a3E8E33De6789dD0378BDc2c8BFE5DBF3E9fbbA',
    price: 0.0000035,
  }, // arbitrum-nova
  137: {
    address: '0x593E76D4787A81f7e8d56dDaa0b3526976b39bb4',
    price: 0.0000035,
  }, // polygon
  42161: {
    address: '0x00',
    price: 0.0000035,
  }, // arbitrum
  534352: {
    address: '0x00',
    price: 0.0000035,
  }, // scroll
  324: {
    address: '0x00',
    price: 0.0000035,
  }, // zkSync
  10: {
    address: '0xdE3D84e555C9a46b88897DA45Ec9f35aCeD72C0B',
    price: 0.0000035,
  }, // optimism
  59144: {
    address: '0xD4Ec29b8bceE8e4Abbe3Ff18a48923ef81314982',
    price: 0.0000035,
  }, // linea
  8453: {
    address: '0x00',
    price: 0.0000035,
  }, // base
  1284: {
    address: '0x00',
    price: 0.0000035,
  }, // moonbeam
  43114: {
    address: '0xB8B29d483732717F77e90C3A669369E4994bC878',
    price: 0.0000035,
  }, // avalanche
  250: {
    address: '0x0b16d7aDf25799bD06489fe529541CB671979259',
    price: 0.0000035,
  }, // fantom
  42220: {
    address: '0x5ddE994d4ce669572F38875C9fb0A318030b85b0',
    price: 0.0000035,
  }, // celo
  100: {
    address: '0x00',
    price: 0.0000035,
  }, // gnosis
  1101: {
    address: '0x00',
    price: 0.0000035,
  }, // polygon-zk
  82: {
    address: '0x00',
    price: 0.0000035,
  }, // meter
  1285: {
    address: '0x00',
    price: 0.0000035,
  }, // moonriver
  1666600000: {
    address: '0x9C59217728FE8F03bA72388208C736B11FD5e1E1',
    price: 0.0000035,
  }, // harmony
  2222: {
    address: '0x00',
    price: 0.0000035,
  }, // kava
  7777777: {
    address: '0x00',
    price: 0.0000035,
  }, // zora
  8217: {
    address: '0x00',
    price: 0.0000035,
  }, // klaytn
  1116: {
    address: '0x00',
    price: 0.0000035,
  }, // core-dao
  5000: {
    address: '0x00',
    price: 0.0000035,
  }, // mantle
  122: {
    address: '0x8D29dCf73F6e3613CBB461049Bc735B48FeF1Ca9',
    price: 0.0000035,
  }, // fuse
  0: {
    address: '0x00',
    price: 0.0000035,
  },
}

export function claimToken(chainId: number) {
  return {
    address: TOKEN_CONTRACTS[chainId].address,
    abi: tokenABI,
    functionName: 'mint',
    chainId,
  }
}

export function getTokenBalance(chainId: number, address: string) {
  return {
    address: TOKEN_CONTRACTS[chainId].address,
    abi: tokenABI,
    functionName: 'balanceOf',
    chainId,
    args: [address],
    enabled: false,
  }
}

export function bridgeToken(chainId: number) {
  return {
    address: TOKEN_CONTRACTS[chainId].address,
    abi: tokenABI,
    functionName: 'sendFrom',
    chainId,
  }
}

export function estimateBridgeTokenFee(
  chainTo: number,
  chainId: number,
  address: string,
  amount: bigint,
) {
  return {
    address: TOKEN_CONTRACTS[chainId].address,
    abi: tokenABI,
    functionName: 'estimateSendFee',
    chainId,
    args: [
      chainTo,
      address,
      amount,
      false,
      '0x00010000000000000000000000000000000000000000000000000000000000030d40',
    ],
    enabled: false,
  }
}
