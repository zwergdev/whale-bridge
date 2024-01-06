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
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    size="sm"
                    variant="secondary"
                    className="before:scale-x-[1.03]"
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
                    className="before:scale-x-[1.03]"
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
                    className="px-2 py-1 h-8 before:scale-x-[1.03] before:scale-y-[1.04]"
                  >
                    {chain.hasIcon && (
                      <div
                        className="w-4 h-4 rounded-full overflow-hidden"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            className="w-4 h-4"
                          />
                        )}
                      </div>
                    )}
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    size="sm"
                    variant="secondary"
                    className="before:scale-x-[1.03]"
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
