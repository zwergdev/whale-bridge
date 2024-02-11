export const DISABLED_PAIRS = [
  [175, 214], // nova <-> scroll
  [214, 175], // scroll <-> nova
  [165, 126], // zk <-> moonbeam
  [165, 125], // zk <-> celo
  [125, 184], // celo <-> base
  [184, 125], // base <-> celo
  [125, 175], // celo <-> nova
  [175, 125], // nova <-> celo
  [125, 214], // celo <-> scroll
  [214, 125], // scroll <-> celo
  [145, 175], // gnosis <-> nova
  [175, 145], // nova <-> gnosis
  [175, 158], // nova <-> polygon-zk
  [158, 175], // polygon-zk <-> scroll
  [165, 145], // zk <-> gnosis
  // meter
  [176, 125], // meter <-> celo
  [176, 116], // meter <-> harmony
  [176, 158], // meter <-> polygon-zk
  [176, 126], // meter <-> moonbeam
  [176, 167], // meter <-> moonriver
  [176, 145], // meter <-> gnosis
  [176, 214], // meter <-> scroll
  [176, 183], // meter <-> linea
  [125, 176], // celo <-> meter
  [116, 176], // harmony <-> meter
  [158, 176], // polygon-zk <-> meter
  [126, 176], // moonbeam <-> meter
  [167, 176], // moonriver <-> meter
  [145, 176], // gnosis <-> meter
  [214, 176], // scroll <-> meter
  [183, 176], // linea <-> meter
  //harmony
  [116, 176], // harmony <-> meter
  [116, 125], // harmony <-> celo
  [116, 158], // harmony <-> polygon-zk
  [116, 175], // harmony <-> nova
  [116, 167], // harmony <-> moonriver
  [116, 145], // harmony <-> gnosis
  [116, 184], // harmony <-> base
  [116, 214], // harmony <-> scroll
  [176, 116], // meter <-> harmony
  [125, 116], // celo <-> harmony
  [158, 116], // polygon-zk <-> harmony
  [175, 116], // nova <-> harmony
  [167, 116], // moonriver <-> harmony
  [145, 116], // gnosis <-> harmony
  [184, 116], // base <-> harmony
  [214, 116], // scroll <-> harmony
  [165, 116], // zk <-> harmony
  // moonriver
  [167, 176], // moonriver <-> meter
  [167, 125], // moonriver <-> celo
  [167, 158], // moonriver <-> polygon-zk
  [167, 175], // moonriver <-> nova
  [167, 145], // moonriver <-> gnosis
  [167, 116], // moonriver <-> harmony
  [167, 126], // moonriver <-> moonbeam
  [176, 167], // meter <-> moonriver
  [125, 167], // celo <-> moonriver
  [158, 167], // polygon-zk <-> moonriver
  [175, 167], // nova <-> moonriver
  [145, 167], // gnosis <-> moonriver
  [116, 167], // harmony <-> moonriver
  [126, 167], // moonbeam <-> moonriver
  [165, 167], // zk <-> moonriver
  // opbnb
  [202, 175], // opbnb <-> nova
  [202, 126], // opbnb <-> moonbeam
  [202, 125], // opbnb <-> celo
  [202, 145], // opbnb <-> gnosis
  [202, 176], // opbnb <-> meter
  [202, 167], // opbnb <-> moonriver
  [202, 116], // opbnb <-> harmony
  [202, 177], // opbnb <-> kava
  [202, 195], // opbnb <-> zora
  [175, 202], // nova <-> opbnb
  [126, 202], // moonbeam <-> opbnb
  [125, 202], // celo <-> opbnb
  [145, 202], // gnosis <-> opbnb
  [176, 202], // meter <-> opbnb
  [167, 202], // moonriver <-> opbnb
  [116, 202], // harmony <-> opbnb
  [177, 202], // kava <-> opbnb
  [195, 202], // zora <-> opbnb
  // kava
  [177, 125], // kava <-> celo
  [177, 145], // kava <-> gnosis
  [177, 176], // kava <-> meter
  [177, 116], // kava <-> harmony
  [177, 202], // kava <-> opbnb
  [177, 195], // kava <-> zora
  [125, 177], // celo <-> kava
  [145, 177], // gnosis <-> kava
  [176, 177], // meter <-> kava
  [116, 177], // harmony <-> kava
  [202, 177], // opbnb <-> kava
  [195, 177], // zora <-> kava
  // zora
  [195, 175], // zora <-> nova
  [195, 214], // zora <-> scroll
  [195, 126], // zora <-> moonbeam
  [195, 112], // zora <-> fantom
  [195, 125], // zora <-> celo
  [195, 145], // zora <-> gnosis
  [195, 158], // zora <-> polygon-zk
  [195, 176], // zora <-> meter
  [195, 167], // zora <-> moonriver
  [195, 116], // zora <-> harmony
  [195, 202], // zora <-> opbnb
  [195, 177], // zora <-> kava
  [165, 195], // zk <-> zora
  [175, 195], // nova <-> zora
  [214, 195], // scroll <-> zora
  [126, 195], // moonbeam <-> zora
  [112, 195], // fantom <-> zora
  [125, 195], // celo <-> zora
  [145, 195], // gnosis <-> zora
  [158, 195], // polygon-zk <-> zora
  [176, 195], // meter <-> zora
  [167, 195], // moonriver <-> zora
  [116, 195], // harmony <-> zora
  [202, 195], // opbnb <-> zora
  [177, 195], // kava <-> zora
  // klaytn
  [150, 125], // klaytn <-> celo
  [150, 195], // klaytn <-> zora
  [150, 116], // klaytn <-> harmony
  [150, 175], // klaytn <-> nova
  [150, 202], // klaytn <-> opbnb
  [150, 158], // klaytn <-> polygon-zk
  [150, 167], // klaytn <-> moonriver
  [150, 112], // klaytn <-> phantom
  [150, 176], // klaytn <-> meter
  [195, 150], // zors <-> klaytn
  [202, 150], // opbnb <-> klaytn
  [116, 150], // harmony <-> klaytn
  [176, 150], // meter <-> klaytn
  [158, 150], // polygon-zk <-> klaytn
  [112, 150], // phantom <-> klaytn
  [125, 150], // celo <-> klaytn
  [175, 150], // nova <-> klaytn
  [167, 150], // moonriver <-> klaytn
  [165, 150], // zk <-> klaytn
  // Mantle
  // [181, 176], // mantle <-> meter
  // [181, 125], // mantle <-> celo
  // [181, 175], // mantle <-> nova
  // [181, 116], // mantle <-> harmony
  // [181, 167], // mantle <-> moonriver
  // [181, 202], // mantle <-> op-bnb
  // [176, 181], // meter <-> mantle
  // [125, 181], // celo <-> mantle
  // [175, 181], // nova <-> mantle
  // [116, 181], // harmony <-> mantle
  // [167, 181], // moonriver <-> mantle
  // [202, 181], // op-bnb <-> mantle
  // CoreDao
  [184, 153], // base <-> core-dao
  [183, 153], // linea <-> core-dao
  [175, 153], // nova <-> core-dao
  [214, 153], // scroll <-> core-dao
  [111, 153], // optimism <-> core-dao
  [126, 153], // moonbeam <-> core-dao
  [112, 153], // fantom <-> core-dao
  [125, 153], // celo <-> core-dao
  [145, 153], // gnosis <-> core-dao
  [158, 153], // polygon-zk <-> core-dao
  [176, 153], // meter <-> core-dao
  [167, 153], // moonriver <-> core-dao
  [116, 153], // harmony <-> core-dao
  [202, 153], // op-bnb <-> core-dao
  [177, 153], // kava <-> core-dao
  [195, 153], // zora <-> core-dao
  [150, 153], // klaytn <-> core-dao
  // [181, 153], // mantle <-> core-dao
  [165, 153], // zk <-> core-dao
  [153, 184], // core-dao <-> base 
  [153, 183], // core-dao <-> linea
  [153, 175], // core-dao <-> nova
  [153, 214], // core-dao <-> scroll
  [153, 111], // core-dao <-> optimism
  [153, 126], // core-dao <-> moonbeam
  [153, 112], // core-dao <-> fantom
  [153, 125], // core-dao <-> celo 
  [153, 145], // core-dao <-> gnosis
  [153, 158], // core-dao <-> polygon-zk
  [153, 176], // core-dao <-> meter
  [153, 167], // core-dao <-> moonriver
  [153, 116], // core-dao <-> harmony 
  [153, 202], // core-dao <-> op-bnb
  [153, 177], // core-dao <-> kava 
  [153, 195], // core-dao <-> zora
  [153, 150], // core-dao <-> klaytn
  // [153, 181], // core-dao <-> mantle

  //ZkSync
  [102, 165], // bsc <-> zk
  [184, 165], // base <-> zk
  [183, 165], // linea <-> zk
  [175, 165], // nova <-> zk
  [109, 165], // polygon <-> zk
  [110, 165], // arbitrum <-> zk
  [214, 165], // scroll <-> zk
  [153, 165], // core-dap <-> zk
  [111, 165], // optimism <-> zk
  [126, 165], // moonbeam <-> zk
  [106, 165], // avalanche <-> zk
  [112, 165], // fantom <-> zk
  [125, 165], // celo <-> zk
  [145, 165], // gnosis <-> zk
  [158, 165], // polygon-zk <-> zk
  [176, 165], // meter <-> zk
  [167, 165], // moonriver <-> zk
  [116, 165], // harmony <-> zk
  [202, 165], // op-bnb <-> zk
  [177, 165], // kava <-> zk
  [195, 165], // zora <-> zk
  [150, 165], // klaytn <-> zk
  // [181, 165], // mantle <-> zk
]
