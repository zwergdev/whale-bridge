import { Skeleton } from '@/components/ui/skeleton'

export default function MintLoading() {
  return (
    <div className="flex max-w-screen-xl w-full min-h-[calc(100vh-160px)] flex-wrap items-center justify-center gap-16 pt-40">
      <div className="flex flex-col">
        <h2 className="font-semibold text-4xl mb-2.5">Mint NFT</h2>
        <Skeleton className="w-40 h-6 mb-5" />
        <Skeleton className="mb-10 w-[304px] h-[52px]" />
        <Skeleton className="w-[500px] h-[72px] mb-12" />
        <Skeleton className="w-full h-14" />
      </div>
      <Skeleton className="w-[440px] h-[440px]" />
    </div>
  )
}
