import { Discord, Telegram, Twitter } from '@/components/ui/icons'
import { GitBook } from '@/components/ui/icons/git-book'

export const NAVIGATION_HEADER = [
  { href: '/mint', label: 'Mint NFT' },
  { href: '/bridge', label: 'Bridge NFT' },
  { href: '/refuel', label: 'Gas Refuel' },
  { href: '/token', label: 'OFT Bridge' },
  { href: '/messenger', label: 'Messenger' },
]

export const NAVIGATION_FOOTER = [
  { href: '/mint', label: 'Mint NFT' },
  { href: '/bridge', label: 'Bridge NFT' },
  { href: '/refuel', label: 'Gas Refuel' },
  { href: '/token', label: 'OFT Bridge' },
  { href: '/messenger', label: 'Messenger' },
  { href: '/contracts', label: 'Contracts' },
  { href: 'https://layerzeroscan.com/protocol/whale', label: 'LayerZero.Scan' },
]

export const FOOTER_LINKS = [
  { icon: <Telegram />, href: 'https://t.me/whale_app_com' },
  { icon: <Twitter />, href: 'https://twitter.com/Whale_app_' },
  { icon: <Discord />, href: 'https://discord.gg/FdNZbwY6' },
  {
    icon: <GitBook style={{ width: '24px' }} />,
    href: 'https://whale-app.gitbook.io/whale-book/',
  },
]
