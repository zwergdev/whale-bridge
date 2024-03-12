import { Abi } from 'viem'

export const gasAbi: Abi = [
  {
    type: 'function',
    name: 'estimateFees',
    inputs: [
      {
        name: '_dstEids',
        type: 'uint32[]',
        internalType: 'uint32[]',
      },
      {
        name: '_messages',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
      {
        name: '_options',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    outputs: [
      {
        name: 'nativeFees',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: '_depositParams',
        type: 'uint256[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'sendDeposits',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
