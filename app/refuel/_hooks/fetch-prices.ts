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
    'avalanche-2': { usd: 36.72 },
    binancecoin: { usd: 368.49 },
    celo: { usd: 0.710108 },
    coredaoorg: { usd: 0.607305 },
    ethereum: { usd: 2906.63 },
    fantom: { usd: 0.396291 },
    'fuse-network-token': { usd: 0.066719 },
    harmony: { usd: 0.01780552 },
    kava: { usd: 0.758906 },
    'klay-token': { usd: 0.217448 },
    mantle: { usd: 0.702472 },
    'matic-network': { usd: 0.922479 },
    meter: { usd: 2.82 },
    'metis-token': { usd: 84.14 },
    moonbeam: { usd: 0.421003 },
    moonriver: { usd: 22.53 },
    shimmer: { usd: 0.02276118 },
    xdai: { usd: 1.009 },
  }
}
