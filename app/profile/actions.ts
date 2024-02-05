'use server'
import prisma from '@/lib/prisma'

export async function createCode(ownerAddress: string, code: string) {
  const isCodeValid = await prisma.code.findUnique({
    where: { code },
  })

  if (isCodeValid) return 0

  return await prisma.code.create({
    data: { ownerAddress, code },
  })
}

export async function redeemCode(userAddress: string, codeValue: string) {
  const isCodeValid = await prisma.code.findUnique({
    where: { code: codeValue },
  })

  if (!isCodeValid) return 0

  return await prisma.usedCode.create({
    data: { userAddress, codeValue },
  })
}

export async function getUser(address: string) {
  const user = await prisma.user.findUnique({
    where: { address },
    select: { address: true, usedCode: true, ownedCode: true },
  })

  if (user) return user

  return await prisma.user.create({
    data: { address },
    select: { address: true, usedCode: true, ownedCode: true },
  })
}

export async function getRefferalsCount(code: string) {
  return await prisma.usedCode.count({
    where: { codeValue: code },
  })
}
