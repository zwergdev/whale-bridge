'use server'

import { waitForMessageReceived } from '@layerzerolabs/scan-client'

export async function scanLayerZero(chainId: number, hash: string) {
  return waitForMessageReceived(chainId, hash)
    .then((message) => {
      console.log(message)
    })
    .finally(() => {
      console.log('finally')
    })
}
