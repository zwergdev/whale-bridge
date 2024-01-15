'use server'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'x-api-key': '6d680f1285bf452e83c7bcbb11f260cc',
  },
}

const CHAINS: { [key: number]: { chain: string; collection: string } } = {
  56: { chain: 'bsc', collection: 'whaletest-onft-2' },
  42170: { chain: 'arbitrum_nova', collection: 'whale-onft-2' },
  137: { chain: 'matic', collection: 'whale-onft' },
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const fetchNFTs = async (address: string, chainId: number) => {
  const url = `https://api.opensea.io/api/v2/chain/${CHAINS[chainId].chain}/account/${address}/nfts?collection=${CHAINS[chainId].collection}`

  const response = await fetch(url, { cache: 'no-cache', ...options })
  return response.json()
}

const extractIdentifiers = (nfts: any[]) =>
  nfts.map(({ identifier }: { identifier: string }) => identifier)

export const getNFTBalance = async (address: string, chainId: number) => {
  if (chainId === 0 || !address) return []

  let res = await fetchNFTs(address, chainId)

  if (res.nfts.length === 0) {
    await delay(2500)
    res = await fetchNFTs(address, chainId)
  }

  return extractIdentifiers(res.nfts)
}
