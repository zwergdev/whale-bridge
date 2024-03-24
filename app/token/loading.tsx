import { Skeleton, Paper } from '@/components/ui'
import { Repeat2 } from 'lucide-react'

export default function TokenLoading() {
  return (
    <>
      <Paper title="TOKEN">
        <div className="w-full">
          <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center mb-5">
            <div className="w-max">
              <div className="flex justify-between items-center w-full mb-2">
                <Skeleton className="w-[147px] h-[24px]" />
                <Skeleton className="w-[58px] h-3.5" />
              </div>
              <Skeleton className="w-[240px] sm:w-[318px] h-[54px] sm:h-[76px]" />
            </div>
            <Repeat2 className="stroke-foreground opacity-75 relative md:top-3 top-1" />
            <div className="w-max">
              <Skeleton className="w-[130px] h-[24px] mb-2" />
              <Skeleton className="w-[240px] sm:w-[318px] h-[54px] sm:h-[76px]" />
            </div>
          </div>
          <Skeleton className="w-[147px] h-[24px] mb-2" />
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:w-auto w-full">
            <Skeleton className="w-full h-12" />
            <div className="w-full sm:w-max flex gap-3 items-center">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="min-w-32 sm:w-auto w-full h-12" />
            </div>
          </div>
          <p className="w-full text-center mt-6 text-lg font-semibold">AND</p>
          <div className="flex items-center justify-between w-full mb-2 mt-5">
            <Skeleton className="w-[147px] h-[24px]" />
            <Skeleton className="w-[58px] h-3.5" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="w-12 h-12" />
            <Skeleton className="w-full h-12" />
          </div>
          <Skeleton className="w-full h-[50px] mt-5" />
        </div>
      </Paper>
    </>
  )
}
