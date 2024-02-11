'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,harmony,matic-network,meter,moonriver,moonbeam,celo,fantom,kava,klay-token,coredaoorg&vs_currencies=usd',
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
    'avalanche-2': { usd: 40.93 },
    binancecoin: { usd: 324.27 },
    celo: { usd: 0.723182 },
    coredaoorg: { usd: 0.537421 },
    ethereum: { usd: 2529.8 },
    fantom: { usd: 0.397587 },
    harmony: { usd: 0.01566958 },
    kava: { usd: 0.724223 },
    'klay-token': { usd: 0.21956 },
    'matic-network': { usd: 0.860018 },
    meter: { usd: 2.94 },
    moonbeam: { usd: 0.38278 },
    moonriver: { usd: 23.28 },
    xdai: { usd: 1.005 },
  }
}
