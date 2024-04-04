export const refuelABI = [
  {
    inputs: [{ internalType: 'address', name: '_lzEndpoint', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'bridgeGas',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: 'payload', type: 'bytes' },
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
]
