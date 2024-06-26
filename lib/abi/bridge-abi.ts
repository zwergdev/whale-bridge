export const bridgeABI = [
  {
    inputs: [
      { internalType: 'uint256', name: '_minGasToTransfer', type: 'uint256' },
      { internalType: 'address', name: '_layerZeroEndpoint', type: 'address' },
      { internalType: 'uint256', name: '_startMintId', type: 'uint256' },
      { internalType: 'uint256', name: '_endMintId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'bool', name: '_useZro', type: 'bool' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'estimateSendFee',
    outputs: [
      { internalType: 'uint256', name: 'nativeFee', type: 'uint256' },
      { internalType: 'uint256', name: 'zroFee', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      {
        internalType: 'address payable',
        name: '_refundAddress',
        type: 'address',
      },
      { internalType: 'address', name: '_zroPaymentAddress', type: 'address' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'sendFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const celoBridgeABI = [
  {
    inputs: [
      { internalType: 'uint256', name: '_minGasToTransfer', type: 'uint256' },
      { internalType: 'address', name: '_layerZeroEndpoint', type: 'address' },
      { internalType: 'uint256', name: '_startMintId', type: 'uint256' },
      { internalType: 'uint256', name: '_endMintId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getUserNFTIds',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'bool', name: '_useZro', type: 'bool' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'estimateSendFee',
    outputs: [
      { internalType: 'uint256', name: 'nativeFee', type: 'uint256' },
      { internalType: 'uint256', name: 'zroFee', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      {
        internalType: 'address payable',
        name: '_refundAddress',
        type: 'address',
      },
      { internalType: 'address', name: '_zroPaymentAddress', type: 'address' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'sendFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const modernBridgeABI = [
  {
    inputs: [
      { internalType: 'uint256', name: '_minGasToTransfer', type: 'uint256' },
      { internalType: 'address', name: '_layerZeroEndpoint', type: 'address' },
      { internalType: 'uint256', name: '_startMintId', type: 'uint256' },
      { internalType: 'uint256', name: '_endMintId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
    name: 'getOwnedNFTs',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'bool', name: '_useZro', type: 'bool' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'estimateSendFee',
    outputs: [
      { internalType: 'uint256', name: 'nativeFee', type: 'uint256' },
      { internalType: 'uint256', name: 'zroFee', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      {
        internalType: 'address payable',
        name: '_refundAddress',
        type: 'address',
      },
      { internalType: 'address', name: '_zroPaymentAddress', type: 'address' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'sendFrom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
