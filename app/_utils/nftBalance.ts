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
  42170: { chain: 'arbitrum_nova', collection: 'whaletest-onft-2' },
  137: { chain: 'matic', collection: 'whaletest-onft' },
}

export const getNFTBalance = async (address: string, chainId: number) => {
  if (chainId === 0) return []
  const res = await fetch(
    `https://api.opensea.io/api/v2/chain/${CHAINS[chainId].chain}/account/${address}/nfts?collection=${CHAINS[chainId].collection}`,
    { cache: 'no-cache', ...options },
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))

  const NFTs = res.nfts.map(
    ({ identifier }: { identifier: string }) => identifier,
  )

  return NFTs
}
