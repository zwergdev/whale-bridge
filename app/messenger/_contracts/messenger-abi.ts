export const messengerABI = [
  {
    inputs: [{ internalType: 'address', name: '_endpoint', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'address', name: '_userApplication', type: 'address' },
      { internalType: 'bytes', name: '_payload', type: 'bytes' },
      { internalType: 'bool', name: '_payInZRO', type: 'bool' },
      { internalType: 'bytes', name: '_adapterParams', type: 'bytes' },
    ],
    name: 'estimateFees',
    outputs: [
      { internalType: 'uint256', name: 'nativeFee', type: 'uint256' },
      { internalType: 'uint256', name: 'zroFee', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'message', type: 'string' },
      { internalType: 'uint16', name: 'destChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_destination', type: 'bytes' },
    ],
    name: 'sendMessage',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
