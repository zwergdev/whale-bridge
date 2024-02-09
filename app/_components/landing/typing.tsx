'use client'

import { TypeAnimation } from 'react-type-animation'

export const Typing = () => (
  <TypeAnimation
    sequence={[
      'Welcome to Whale, your multifunctional omnichain solution platform for seamless Web3 experiences. Mint NFTs in a Flash, Top Up Crypto Gas Instantly, and Bridge Assets Seamlessly.',
    ]}
    wrapper="h2"
    className="text-foreground md:text-2xl md:h-24 sm:h-40 h-40 text-xl font-semibold max-w-screen-md text-center"
  />
)
