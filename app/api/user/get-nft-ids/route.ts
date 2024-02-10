import { NextResponse } from 'next/server'

type RequestBody = {
  address: string
  chainId: number
}

const API_KEYS = {
  element: '836618cabf89a3313263626025eaa225',
  opensea: '6d680f1285bf452e83c7bcbb11f260cc',
  nftscan: 'ifwgRnIiWn5MrEkd8ne6797E',
}

const CHAINS: { [key: number]: { chain: string; collection: string } } = {
  42170: {
    chain: 'arbitrum_nova',
    collection: '0x1010a05759a0a7Daa665f12Ec677ff5034Ecd35F',
  },
  56: {
    chain: 'bnbapi',
    collection: '0x006E23eb40eBc1805783e3a6c39283bcF5799368',
  },
  137: {
    chain: 'polygonapi',
    collection: '0xE1c907503B8d1545AFD5A89cc44FC1E538A132DA',
  },
  42161: {
    chain: 'arbitrumapi',
    collection: '0x26E9934024cdC7fcc9f390973d4D9ac1FA954a37',
  },
  534352: {
    chain: 'scrollapi',
    collection: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
  },
  324: {
    chain: 'zksyncapi',
    collection: '0xF09A71F6CC8DE983dD58Ca474cBC33de43DDEBa9',
  },
  10: {
    chain: 'optimismapi',
    collection: '0xe87492ae9151769412F40af251d1D2793271e699',
  },
  59144: {
    chain: 'lineaapi',
    collection: '0x84f4c0A290B5607fee0f2A1CDe5348540fecF6A1',
  },
  8453: {
    chain: 'baseapi',
    collection: '0xa0d013b84FBAeFF5AbFc92A412a44572382dCA08',
  },
  1284: {
    chain: 'moonbeamapi',
    collection: '0xd709e73c5213Fd291d0BfA55A7D934B741398d96',
  },
  43114: {
    chain: 'avaxapi',
    collection: '0x54C71EBBd27520bCbE3E3973a4B579A27035ACD3',
  },
  250: {
    chain: 'fantomapi',
    collection: '0x82d5a068ba58ad31c419275474333B8696B3641d',
  },
  100: {
    chain: 'gnosisapi',
    collection: '0xe9EbD35Ea4aCCb97e0F5BF3CDA31fe3Ac90111Cc',
  }
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
  const url = `https://${CHAINS[chainId].chain}.nftscan.com/api/v2/account/own/${address}?erc_type=erc721&show_attribute=false&sort_field=&sort_direction=&contract_address=${CHAINS[chainId].collection}`
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

export async function POST(request: Request) {
  const { address, chainId }: Partial<RequestBody> = await request.json()

  if (!address || !chainId) return NextResponse.json([])

  const res = await getNFTs(address, chainId)

  const isNotFound = checkIsNotFound(res, chainId)

  if (isNotFound) return NextResponse.json([])

  return NextResponse.json(extractIdentifiers(res, chainId))
}
