'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,harmony,matic-network,meter,moonriver,moonbeam,celo,fantom,kava,klay-token&vs_currencies=usd',
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
      usd: 39.06,
    },
    binancecoin: {
      usd: 321.23,
    },
    celo: {
      usd: 0.713664,
    },
    ethereum: {
      usd: 2485.29,
    },
    fantom: {
      usd: 0.391561,
    },
    harmony: {
      usd: 0.01528527,
    },
    kava: {
      usd: 0.720289,
    },
    'klay-token': {
      usd: 0.217367,
    },
    'matic-network': {
      usd: 0.842662,
    },
    meter: {
      usd: 2.72,
    },
    moonbeam: {
      usd: 0.382244,
    },
    moonriver: {
      usd: 22.71,
    },
    xdai: {
      usd: 1.007,
    },
  }
}
