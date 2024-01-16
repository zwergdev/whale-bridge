'use client'

import { Button } from '@/components/ui/button'
import { ConnectButton as RainbowButton } from '@rainbow-me/rainbowkit'
export const ConnectButton = () => {
  return (
    <RainbowButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain
        return (
          <div>
            {(() => {
              if (!mounted) {
                return (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="before:scale-x-[1.03] md:text-xl text-base pointer-events-none"
                  >
                    Connect Wallet
                  </Button>
                )
              }
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    size="sm"
                    variant="secondary"
                    className="before:scale-x-[1.03] md:text-xl text-base"
                  >
                    Connect Wallet
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    size="sm"
                    variant="secondary"
                    className="before:scale-x-[1.03] md:text-xl text-base"
                  >
                    Wrong network
                  </Button>
                )
              }
              return (
                <div className="flex gap-3 items-center">
                  <Button
                    variant="secondary"
                    onClick={openChainModal}
                    className="p-2.5 before:scale-x-[1.1] before:scale-y-[1.1]"
                  >
                    {chain.hasIcon && (
                      <div
                        className="rounded-full overflow-hidden flex items-center justify-between"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-7 h-7"
                          />
                        )}
                      </div>
                    )}
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    size="sm"
                    variant="secondary"
                    className="before:scale-x-[1.03] md:text-xl text-base"
                  >
                    {account.displayName}
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </RainbowButton.Custom>
  )
}
