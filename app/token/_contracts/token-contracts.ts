import { tokenABI } from './token-abi'

export const TOKEN_CONTRACTS: {
  [chainId: number]: {
    address: `0x${string}`
    price: number
  }
} = {
  56: {
    address: '0x408bE6A5C550913B46B8FA9196c122083811Be96',
    price: 0.00002835,
  }, // bsc
  204: {
    address: '0xb9F2BEE223C9c7BEAc8d7517d950DBdC19Bf8680',
    price: 0.00002835,
  }, // op-bnb
  42170: {
    address: '0x7a3E8E33De6789dD0378BDc2c8BFE5DBF3E9fbbA',
    price: 0.0000035,
  }, // arbitrum-nova
  137: {
    address: '0x593E76D4787A81f7e8d56dDaa0b3526976b39bb4',
    price: 0.011,
  }, // polygon
  42161: {
    address: '0xD0f6733564BaE9aB83aE4FFC4a07073110aA9D21',
    price: 0.0000035,
  }, // arbitrum
  534352: {
    address: '0x96930eD766Bb09C222A68c305Bfe1cA68228343b',
    price: 0.0000035,
  }, // scroll
  324: {
    address: '0x323C5bC6EC6F4f1Db31061eA463085B6495E4888',
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
    address: '0x0b16d7aDf25799bD06489fe529541CB671979259',
    price: 0.0000035,
  }, // base
  1284: {
    address: '0x4c95919db6a972bca8f6c1962f01fe703cc81b04',
    price: 0.02349,
  }, // moonbeam
  43114: {
    address: '0xB8B29d483732717F77e90C3A669369E4994bC878',
    price: 0.00024,
  }, // avalanche
  250: {
    address: '0x1471cfF942D7EF8bf5c8597A2d8313C211C3F22b',
    price: 0.024,
  }, // fantom
  42220: {
    address: '0xE86B177C6464bA905F95ff82F1fD00a23465D86F',
    price: 0.01314,
  }, // celo
  100: {
    address: '0xFE932de33e031dCa67899aE611cA1E6eb3061c6D',
    price: 0.01,
  }, // gnosis
  1101: {
    address: '0xe8902CCd6ed53a11351A026Cf4D190D2e079FbBE',
    price: 0.0000035,
  }, // polygon-zk
  82: {
    address: '0x00',
    price: 0.0000035,
  }, // meter
  1285: {
    address: '0x67b9d86a5e80ba2400122e94c46c8694f2e30b46',
    price: 0.0004393,
  }, // moonriver
  1666600000: {
    address: '0x9C59217728FE8F03bA72388208C736B11FD5e1E1',
    price: 0.58,
  }, // harmony
  2222: {
    address: '0x9C59217728FE8F03bA72388208C736B11FD5e1E1',
    price: 0.013,
  }, // kava
  7777777: {
    address: '0x20141dbca66f247c04AF4D0E30184fD20BDB73B5',
    price: 0.0000035,
  }, // zora
  8217: {
    address: '0x00',
    price: 0.0000035,
  }, // klaytn
  1116: {
    address: '0x6C0805dfdBdC36866cb86b8Ae78419D8fc60139e',
    price: 0.0188,
  }, // core-dao
  5000: {
    address: '0x1010a05759a0a7Daa665f12Ec677ff5034Ecd35F',
    price: 0.01285,
  }, // mantle
  122: {
    address: '0x8D29dCf73F6e3613CBB461049Bc735B48FeF1Ca9',
    price: 0.147,
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
