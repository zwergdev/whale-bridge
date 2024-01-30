'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,binancecoin,matic-network,moonbeam,celo,fantom&vs_currencies=usd',
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
      usd: 35.91,
    },
    binancecoin: {
      usd: 310.23,
    },
    celo: {
      usd: 0.670304,
    },
    ethereum: {
      usd: 2297.36,
    },
    fantom: {
      usd: 0.387356,
    },
    'matic-network': {
      usd: 0.807055,
    },
    moonbeam: {
      usd: 0.38804,
    },
  }
}
