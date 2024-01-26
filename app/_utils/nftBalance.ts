'use server'

const API_KEYS = {
  element: '836618cabf89a3313263626025eaa225',
  opensea: '6d680f1285bf452e83c7bcbb11f260cc',
  nftscan: 'ifwgRnIiWn5MrEkd8ne6797E',
}

const CHAINS: { [key: number]: { chain: string; collection: string } } = {
  56: { chain: 'bsc', collection: 'whale-onft-91e3d9' },
  42170: { chain: 'arbitrum_nova', collection: 'whale-onft-2' },
  137: { chain: 'polygon', collection: 'whale-onft-1dc1b2' },
  42161: { chain: 'arbitrum', collection: 'whale-onft-91e43c' },
  534352: { chain: 'scroll', collection: 'whale-onft-6fa936' },
  324: { chain: 'zksync', collection: 'whale-onft-4bb3f1' },
  10: { chain: 'optimism', collection: 'whale-onft-6faadf' },
  59144: { chain: 'linea', collection: 'whale-onft-4bd1ec' },
  8453: { chain: 'base', collection: 'whale-onft-4bd161' },
  1284: { chain: 'moonbeam', collection: 'XXXXXXXXXXXXXXXXXXXX' },
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const fetchFromElement = async (address: string, chainId: number) => {
  const url = `https://api.element.market/openapi/v1/account/assetList?chain=${CHAINS[chainId].chain}&wallet_address=${address}&collection_slug=${CHAINS[chainId].collection}`
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { accept: 'application/json', 'x-api-key': API_KEYS.element },
  })

  return response.json()
}

const fetchFromOpensea = async (address: string) => {
  const url = `https://api.opensea.io/api/v2/chain/arbitrum_nova/account/${address}/nfts?collection=whale-onft-2`
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { accept: 'application/json', 'x-api-key': API_KEYS.opensea },
  })

  return response.json()
}

const fetchFromNFTScan = async (address: string) => {
  const url = `https://moonbeamapi.nftscan.com/api/v2/account/own/${address}?erc_type=erc721&show_attribute=false&sort_field=&sort_direction=&contract_address=0xd709e73c5213Fd291d0BfA55A7D934B741398d96`
  const response = await fetch(url, {
    cache: 'no-cache',
    headers: { accept: 'application/json', 'x-api-key': API_KEYS.nftscan },
  })

  return response.json()
}

const extractOpenseaIdentifiers = (res: any) =>
  res?.nfts?.map(({ identifier }: { identifier: string }) => identifier)

const extractElementIdentifiers = (res: any) =>
  res?.assetList?.map(({ asset }: { asset: { tokenId: any } }) => asset.tokenId)

const extractNFTScanIdentifiers = (res: any) =>
  res?.data?.content?.map(({ token_id }: { token_id: any }) => token_id)

const getNFTs = async (address: string, chainId: number) => {
  switch (chainId) {
    case 42170:
      return await fetchFromOpensea(address)
    case 1284:
      return await fetchFromNFTScan(address)
    default:
      return await fetchFromElement(address, chainId)
  }
}

const extractIdentifiers = (nfts: any, chainId: number) => {
  switch (chainId) {
    case 42170:
      return extractOpenseaIdentifiers(nfts)
    case 1284:
      return extractNFTScanIdentifiers(nfts)
    default:
      return extractElementIdentifiers(nfts)
  }
}

export const getNFTBalance = async (address: string, chainId: number) => {
  if (chainId === 0 || !address) return []

  let res = await getNFTs(address, chainId)

  const isNull =
    res?.nfts?.length === 0 ||
    res?.data?.assetList?.length === 0 ||
    res?.data?.content?.length === 0

  if (isNull) {
    await delay(2500)
    res = await getNFTs(address, chainId)
  }

  return extractIdentifiers(res, chainId)
}
