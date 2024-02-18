import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'Manage your profile on Whale. Check your referrals, redeem code and more.',
}

export default function ProfileLayout({
  children,
}: { children: React.ReactNode }) {
  return children
}
