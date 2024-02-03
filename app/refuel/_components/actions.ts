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
      usd: 36.16,
    },
    binancecoin: {
      usd: 300.1,
    },
    celo: {
      usd: 0.670646,
    },
    ethereum: {
      usd: 2301.47,
    },
    fantom: {
      usd: 0.358464,
    },
    'matic-network': {
      usd: 0.789069,
    },
    moonbeam: {
      usd: 0.352367,
    },
    moonriver: {
      usd: 22.06,
    },
    xdai: {
      usd: 0.998061,
    },
  }
}
