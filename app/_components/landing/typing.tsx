'use client'

import { TypeAnimation } from 'react-type-animation'

export const Typing = () => (
  <TypeAnimation
    sequence={[
      'Welcome to Whale, your multifunctional omnichain solution platform for seamless Web3 experiences. Mint NFTs in a Flash, Top Up Crypto Gas Instantly, and Bridge Assets Seamlessly.',
    ]}
    wrapper="p"
    cursor={true}
    className="text-foreground md:mb-16 mb-10 md:text-2xl md:h-24 h-40 text-xl font-light max-w-screen-md text-center"
  />
)
