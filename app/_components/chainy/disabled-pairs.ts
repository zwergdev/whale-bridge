type DisabledPairs = {
  [key: number]: number[]
}

export const DISABLED_PAIRS: DisabledPairs = {
  165: [125, 138, 116, 126, 167, 145, 153, 195], // zk
  176: [125, 138, 150, 158, 116, 167, 145, 177, 153, 195, 202, 214, 126], // meter
  116: [
    165, 176, 125, 138, 150, 175, 158, 167, 153, 177, 145, 181, 195, 202, 184,
    214,
  ], // harmony
  111: [], // optimism
  125: [165, 176, 150, 116, 175, 167, 177, 181, 195, 202, 214, 153, 184], // celo
  106: [], // avalanche
  175: [125, 150, 158, 116, 167, 145, 153, 181, 195, 214, 202, 138], // nova
  158: [176, 150, 175, 116, 167, 153, 195], // polygon-zk
  102: [], // bsc
  126: [165, 176, 167, 153, 195, 202], // moonbeam
  167: [165, 176, 125, 150, 175, 158, 116, 126, 195, 202, 138, 153], // moonriver
  145: [165, 176, 175, 116, 167, 153, 177, 195, 202], // gnosis
  202: [176, 125, 138, 150, 175, 116, 126, 167, 177, 145, 181, 153], // op-bnb
  112: [150, 195, 153], // fantom
  110: [], // arbitrum
  109: [], // polygon
  184: [125, 138, 116, 153], // base
  183: [153], // linea
  214: [176, 125, 138, 175, 116, 195, 153], // scroll
  177: [176, 125, 145, 153, 195, 202], // kava
  195: [
    165, 176, 125, 138, 150, 175, 158, 116, 167, 126, 112, 202, 214, 145, 153,
  ], // zora
  150: [176, 125, 175, 158, 116, 167, 112, 195, 202, 153], // klaytn
  181: [176, 125, 138, 175, 116, 153, 202, 167], // mantle
  153: [
    165, 176, 125, 138, 150, 175, 158, 116, 167, 126, 145, 112, 177, 184, 183,
    181, 195, 202, 214,
  ], // core-dao
  138: [
    165, 176, 175, 158, 116, 167, 126, 153, 177, 184, 183, 181, 195, 202, 214,
  ], // fuse
}

// ALL CHAINS - remove which are connected

// [
//   176, // meter
//   116, // harmony
//   167, // moonriver
//   202, // op-bnb
//   177, // kava
//   195, // zora
//   150, // klaytn
//   181, // mantle
//   153, // core-dao
//   138, // fuse
//   165, // zk
//   175, // nova
//   214, // scroll
//   125, // celo
//   184, // base
//   145, // gnosis
//   158, // polygon-zk
//   126, // moonbeam
//   112, // phantom
//   183, // linea
//   111, // optimism
//   110, // arbitrum
//   109, // polygon
//   106, // avalanche
//   102, // bsc
// ]
