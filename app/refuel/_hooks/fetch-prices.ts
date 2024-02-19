'use server'

export type Prices = {
  [key: string]: { usd: number }
}

export const fetchPrices = async (): Promise<Prices> => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,avalanche-2,xdai,binancecoin,harmony,matic-network,meter,moonriver,moonbeam,celo,fantom,kava,klay-token,coredaoorg,fuse-network-token,mantle,metis-token&vs_currencies=usd',
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
      usd: 39.49,
    },
    binancecoin: {
      usd: 353.15,
    },
    celo: {
      usd: 0.777237,
    },
    coredaoorg: {
      usd: 0.781624,
    },
    ethereum: {
      usd: 2945.07,
    },
    fantom: {
      usd: 0.427329,
    },
    'fuse-network-token': {
      usd: 0.067429,
    },
    harmony: {
      usd: 0.01920083,
    },
    kava: {
      usd: 0.782225,
    },
    'klay-token': {
      usd: 0.233599,
    },
    mantle: {
      usd: 0.758976,
    },
    'matic-network': {
      usd: 0.992973,
    },
    meter: {
      usd: 3.18,
    },
    'metis-token': {
      usd: 89.88,
    },
    moonbeam: {
      usd: 0.462886,
    },
    moonriver: {
      usd: 24.24,
    },
    xdai: {
      usd: 1.032,
    },
  }
}
