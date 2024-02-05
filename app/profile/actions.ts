'use server'
import prisma from '@/lib/prisma'

export async function createUser(address: string) {
  return await prisma.user.create({ data: { address } })
}

export async function createCode(ownerAddress: string, code: string) {
  return await prisma.code.create({
    data: { ownerAddress, code },
  })
}

export async function redeemCode(userAddress: string, codeValue: string) {
  return await prisma.usedCode.create({
    data: { userAddress, codeValue },
  })
}
