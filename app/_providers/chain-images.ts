import arbitrumNovaLogo from '@/public/chain-logo/arb-nova.svg'
import arbLogo from '@/public/chain-logo/arb.svg'
import avalancheLogo from '@/public/chain-logo/avalanche.svg'
import baseLogo from '@/public/chain-logo/base.svg'
import bnbLogo from '@/public/chain-logo/bnb.svg'
import celoLogo from '@/public/chain-logo/celo.svg'
import coreLogo from '@/public/chain-logo/core-dao.svg'
import fantomLogo from '@/public/chain-logo/fantom.svg'
import fuseLogo from '@/public/chain-logo/fuse.svg'
import gnosisLogo from '@/public/chain-logo/gnosis.svg'
import harmonyLogo from '@/public/chain-logo/harmony.svg'
import kavaLogo from '@/public/chain-logo/kava.svg'
import klaytnLogo from '@/public/chain-logo/klaytn.svg'
import lineaLogo from '@/public/chain-logo/linea.svg'
import mantleLogo from '@/public/chain-logo/mantle.svg'
import meterLogo from '@/public/chain-logo/meter.svg'
import moonbeamLogo from '@/public/chain-logo/moonbeam.svg'
import moonriverLogo from '@/public/chain-logo/moonriver.svg'
import opBnbLogo from '@/public/chain-logo/op-bnb.svg'
import metisLogo from '@/public/chain-logo/metis.svg'
import optimismLogo from '@/public/chain-logo/optimism.svg'
import polygonZkLogo from '@/public/chain-logo/polygon-zk.svg'
import polygonLogo from '@/public/chain-logo/polygon.svg'
import scrollLogo from '@/public/chain-logo/scroll.svg'
import zkLogo from '@/public/chain-logo/zk.svg'
import zoraLogo from '@/public/chain-logo/zora.svg'
import shimmerLogo from '@/public/chain-logo/shimmer-evm.svg'
import {
  arbitrum,
  arbitrumNova,
  avalanche,
  base,
  bsc,
  celo,
  coreDao,
  fantom,
  fuse,
  gnosis,
  harmonyOne,
  kava,
  klaytn,
  linea,
  mantle,
  meter,
  moonbeam,
  moonriver,
  opBNB,
  optimism,
  polygon,
  polygonZkEvm,
  scroll,
  zkSync,
  zora,
  metis,
  shimmer,
} from 'wagmi/chains'

const wagmiChains = [
  zkSync,
  polygon,
  arbitrumNova,
  bsc,
  linea,
  arbitrum,
  scroll,
  optimism,
  base,
  moonbeam,
  avalanche,
  fantom,
  celo,
  gnosis,
  polygonZkEvm,
  meter,
  moonriver,
  harmonyOne,
  opBNB,
  kava,
  zora,
  klaytn,
  coreDao,
  fuse,
  mantle,
  metis,
  shimmer,
]

const chainImages = {
  324: zkLogo.src,
  42170: arbitrumNovaLogo.src,
  56: bnbLogo.src,
  137: polygonLogo.src,
  59144: lineaLogo.src,
  42161: arbLogo.src,
  534352: scrollLogo.src,
  10: optimismLogo.src,
  8453: baseLogo.src,
  1284: moonbeamLogo.src,
  43114: avalancheLogo.src,
  250: fantomLogo.src,
  42220: celoLogo.src,
  100: gnosisLogo.src,
  1101: polygonZkLogo.src,
  82: meterLogo.src,
  1285: moonriverLogo.src,
  1666600000: harmonyLogo.src,
  204: opBnbLogo.src,
  2222: kavaLogo.src,
  7777777: zoraLogo.src,
  8217: klaytnLogo.src,
  1116: coreLogo.src,
  5000: mantleLogo.src,
  122: fuseLogo.src,
  1088: metisLogo.src,
  148: shimmerLogo.src,
}

export const chains = wagmiChains.map((chain) => {
  return { ...chain, iconUrl: chainImages[chain.id] }
}) as any
