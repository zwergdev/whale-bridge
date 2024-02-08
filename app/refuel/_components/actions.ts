'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,harmony,matic-network,meter,moonriver,moonbeam,celo,fantom,kava&vs_currencies=usd',
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
      usd: 35.41,
    },
    binancecoin: {
      usd: 319.38,
    },
    celo: {
      usd: 0.719841,
    },
    ethereum: {
      usd: 2424.06,
    },
    fantom: {
      usd: 0.375265,
    },
    harmony: {
      usd: 0.014392,
    },
    kava: {
      usd: 0.711215,
    },
    'matic-network': {
      usd: 0.84409,
    },
    meter: {
      usd: 2.59,
    },
    moonbeam: {
      usd: 0.385482,
    },
    moonriver: {
      usd: 22.02,
    },
    xdai: {
      usd: 1.003,
    },
  }
}
