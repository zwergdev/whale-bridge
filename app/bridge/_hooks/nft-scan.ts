'use server'

import { COLLECTIONS_NFT } from "@/lib/constants"

const API_KEYS = {
  opensea: '6d680f1285bf452e83c7bcbb11f260cc',
  nftscan: 'ifwgRnIiWn5MrEkd8ne6797E',
}

const fetchFromOpensea = async (address: string) => {
  const url = `https://api.opensea.io/api/v2/chain/arbitrum_nova/account/${address}/nfts?collection=whale-onft-2`
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { accept: 'application/json', 'x-api-key': API_KEYS.opensea },
  })

  return response.json()
}

const fetchFromNFTScan = async (address: string, chainId: number) => {
  const url = `https://${COLLECTIONS_NFT[chainId].chain}.nftscan.com/api/v2/account/own/${address}?erc_type=erc721&show_attribute=false&sort_field=&sort_direction=&contract_address=${COLLECTIONS_NFT[chainId].collection}`
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { accept: 'application/json', 'x-api-key': API_KEYS.nftscan },
  })

  return response.json()
}

const extractOpenseaIdentifiers = (res: any) =>
  res?.nfts?.map(({ identifier }: { identifier: string }) => identifier)

const extractNFTScanIdentifiers = (res: any) =>
  res?.data?.content?.map(({ token_id }: { token_id: any }) => token_id)

const getNFTs = async (address: string, chainId: number) => {
  switch (chainId) {
    case 42170:
      return await fetchFromOpensea(address)
    default:
      return await fetchFromNFTScan(address, chainId)
  }
}

const extractIdentifiers = (nfts: any, chainId: number) => {
  switch (chainId) {
    case 42170:
      return extractOpenseaIdentifiers(nfts)
    default:
      return extractNFTScanIdentifiers(nfts)
  }
}

const checkIsNotFound = (res: any, chainId: number) => {
  switch (chainId) {
    case 42170:
      return res?.nfts?.length === 0
    default:
      return res?.data?.content?.length === 0
  }
}

export const getNFTBalance = async (
  address: string,
  chainId: number,
): Promise<any[]> => {
  if (
    !address ||
    chainId === 0 ||
    chainId === 42220 ||
    chainId === 1101 ||
    chainId === 82 ||
    chainId === 1285 ||
    chainId === 1666600000 ||
    chainId === 204 ||
    chainId === 2222 ||
    chainId === 7777777 ||
    chainId === 8217 ||
    chainId === 1116 ||
    chainId === 5000 ||
    chainId === 122 ||
    chainId === 1088 || 
    chainId === 148
  )
    return []

  const res = await getNFTs(address, chainId)

  const isNotFound = checkIsNotFound(res, chainId)

  if (isNotFound) return []

  return extractIdentifiers(res, chainId)
}
