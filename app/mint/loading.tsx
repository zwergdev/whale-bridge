import { Skeleton } from '@/components/ui/skeleton'

export default function MintLoading() {
  return (
    <div className="flex max-w-screen-xl w-full min-h-[calc(100vh-160px)] flex-wrap items-center justify-center sm:gap-16 pt-40">
      <div className="flex flex-col max-sm:w-full">
        <h2 className="font-semibold text-4xl mb-2.5">Mint NFT</h2>
        <Skeleton className="w-1/2 sm:w-40 h-6 mb-5" />
        <Skeleton className="mb-10 w-9/12 sm:w-[304px] h-[52px]" />
        <Skeleton className="w-full sm:w-[500px] h-[72px] mb-12" />
        <Skeleton className="w-full h-14" />
      </div>
      <Skeleton className="w-[440px] h-[326px] sm:h-[440px]" />
    </div>
  )
}
