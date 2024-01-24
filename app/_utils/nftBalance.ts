'use server'

const API_KEYS = {
  element: '836618cabf89a3313263626025eaa225',
  opensea: '6d680f1285bf452e83c7bcbb11f260cc',
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
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const fetchFromElement = async (address: string, chainId: number) => {
  const url = `https://api.element.market/openapi/v1/account/assetList?chain=${CHAINS[chainId].chain}&wallet_address=${address}&collection_slug=${CHAINS[chainId].collection}`
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: { accept: 'application/json', 'x-api-key': API_KEYS.element },
  })

  return response.json()
}

const fetchFromOpensea = async (address: string) => {
  const url = `https://api.opensea.io/api/v2/chain/arbitrum_nova/account/${address}/nfts?collection=whale-onft-2`
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: { accept: 'application/json', 'x-api-key': API_KEYS.opensea },
  })

  return response.json()
}

const extractOpenseaIdentifiers = (nfts: any[]) =>
  nfts?.map(({ identifier }) => identifier)

const extractElementIdentifiers = (nfts: any[]) =>
  nfts?.map(({ asset }) => asset.tokenId)

export const getNFTBalance = async (address: string, chainId: number) => {
  if (chainId === 0 || !address) return []

  await delay(2500)

  let res =
    chainId === 42170
      ? await fetchFromOpensea(address)
      : await fetchFromElement(address, chainId)

  if (chainId === 42170) {
    if (res?.nfts?.length === 0) {
      await delay(2500)
      res = await fetchFromOpensea(address)
    }
    return extractOpenseaIdentifiers(res.nfts)
  }

  if (res?.data?.assetList?.length === 0) {
    await delay(2500)
    res = await fetchFromElement(address, chainId)
  }
  return extractElementIdentifiers(res?.data?.assetList)
}
