'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,binancecoin,matic-network,moonbeam&vs_currencies=usd',
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
      usd: 32.42,
    },
    binancecoin: {
      usd: 303.71,
    },
    ethereum: {
      usd: 2266.09,
    },
    'matic-network': {
      usd: 0.784133,
    },
    moonbeam: {
      usd: 0.379812,
    },
  }
}
