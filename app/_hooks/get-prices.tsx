'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,harmony,matic-network,meter,moonriver,moonbeam,celo,fantom,kava,klay-token,coredaoorg,fuse-network-token,mantle,metis-token,shimmer&vs_currencies=usd',
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
    'avalanche-2': { usd: 55.4 },
    binancecoin: { usd: 536.55 },
    celo: { usd: 1.56 },
    coredaoorg: { usd: 0.694915 },
    ethereum: { usd: 3947.82 },
    fantom: { usd: 0.800117 },
    'fuse-network-token': { usd: 0.103039 },
    harmony: { usd: 0.03592474 },
    kava: { usd: 1.043 },
    'klay-token': { usd: 0.286525 },
    mantle: { usd: 1.043 },
    'matic-network': { usd: 1.16 },
    meter: { usd: 2.95 },
    'metis-token': { usd: 128.08 },
    moonbeam: { usd: 0.624025 },
    moonriver: { usd: 23.7 },
    shimmer: { usd: 0.01843356 },
    xdai: { usd: 0.993191 },
  }
}
