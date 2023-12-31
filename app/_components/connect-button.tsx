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
                  <Button onClick={openConnectModal} className="h-7">
                    Connect Wallet
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} className="h-7">
                    Wrong network
                  </Button>
                )
              }
              return (
                <div className="flex gap-3">
                  <Button
                    variant="link"
                    onClick={openChainModal}
                    className="flex items-center h-7 px-2 border-border border"
                    type="button"
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
                  <Button onClick={openAccountModal} className="h-7">
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
