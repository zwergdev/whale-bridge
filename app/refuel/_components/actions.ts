'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,harmony,matic-network,meter,moonriver,moonbeam,celo,fantom&vs_currencies=usd',
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
      usd: 35.64,
    },
    binancecoin: {
      usd: 299.75,
    },
    celo: {
      usd: 0.663295,
    },
    ethereum: {
      usd: 2298.77,
    },
    fantom: {
      usd: 0.349306,
    },
    harmony: {
      usd: 0.01403822,
    },
    'matic-network': {
      usd: 0.777015,
    },
    meter: {
      usd: 2.44,
    },
    moonbeam: {
      usd: 0.341742,
    },
    moonriver: {
      usd: 21.57,
    },
    xdai: {
      usd: 1.003,
    },
  }
}
