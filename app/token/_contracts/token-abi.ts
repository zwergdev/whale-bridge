export const tokenABI = [
  {
    inputs: [
      { internalType: 'address', name: '_layerZeroEndpoint', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
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
  {
    inputs: [
      { internalType: 'uint16', name: '_dstChainId', type: 'uint16' },
      { internalType: 'bytes', name: '_toAddress', type: 'bytes' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
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
]
