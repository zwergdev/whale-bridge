'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,matic-network,moonbeam&vs_currencies=usd',
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
    binancecoin: {
      usd: 300.7,
    },
    ethereum: {
      usd: 2248.79,
    },
    'matic-network': {
      usd: 0.749275,
    },
    moonbeam: {
      usd: 0.372005,
    },
  }
}
