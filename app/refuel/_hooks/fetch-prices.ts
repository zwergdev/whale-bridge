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
    'avalanche-2': {
      usd: 40.29,
    },
    binancecoin: {
      usd: 350.37,
    },
    celo: {
      usd: 0.765148,
    },
    coredaoorg: {
      usd: 0.606886,
    },
    ethereum: {
      usd: 2869.08,
    },
    fantom: {
      usd: 0.421111,
    },
    'fuse-network-token': {
      usd: 0.066976,
    },
    harmony: {
      usd: 0.01815574,
    },
    kava: {
      usd: 0.763224,
    },
    'klay-token': {
      usd: 0.225577,
    },
    mantle: {
      usd: 0.78745,
    },
    'matic-network': {
      usd: 0.992935,
    },
    meter: {
      usd: 2.74,
    },
    moonbeam: {
      usd: 0.442975,
    },
    moonriver: {
      usd: 23.72,
    },
    xdai: {
      usd: 1.002,
    },
  }
}
