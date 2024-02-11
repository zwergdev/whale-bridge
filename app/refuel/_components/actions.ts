'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,harmony,matic-network,meter,moonriver,moonbeam,celo,fantom,kava,klay-token,coredaoorg,fuse-network-token,mantle&vs_currencies=usd',
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
    'avalanche-2': { usd: 40.55 },
    binancecoin: { usd: 322.48 },
    celo: { usd: 0.718308 },
    coredao: { usd: 1.14 },
    ethereum: { usd: 2523.47 },
    fantom: { usd: 0.394379 },
    harmony: { usd: 0.01550056 },
    kava: { usd: 0.720684 },
    'klay-token': { usd: 0.220454 },
    mantle: { usd: 0.663829 },
    'matic-network': { usd: 0.853697 },
    meter: { usd: 2.93 },
    moonbeam: { usd: 0.383465 },
    moonriver: { usd: 23.14 },
    xdai: { usd: 1.004 },
  }
}
