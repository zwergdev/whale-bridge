'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,matic-network,moonbeam,celo,fantom&vs_currencies=usd',
    {
      referrerPolicy: 'same-origin',
      next: { revalidate: 3600 * 12 },
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
  )

  if (res.ok) return await res.json()

  return {
    'avalanche-2': {
      usd: 35.9,
    },
    binancecoin: {
      usd: 309.34,
    },
    celo: {
      usd: 0.686965,
    },
    ethereum: {
      usd: 2313.16,
    },
    fantom: {
      usd: 0.379509,
    },
    'matic-network': {
      usd: 0.801981,
    },
    moonbeam: {
      usd: 0.37868,
    },
    xdai: {
      usd: 0.998752,
    },
  }
}
