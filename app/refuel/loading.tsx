import { Paper, Skeleton } from '@/components/ui'
import { Repeat2 } from '@/components/ui/icons'

export default function RefuelLoading() {
  return (
    <>
      <Paper title="REFUEL GAS">
        <div className="relative">
          <Skeleton className="w-[111px] h-8 absolute -top-12 right-0" />
          <div className="w-full">
            <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center mb-6">
              <div className="w-max">
                <div className="flex justify-between items-center w-full mb-2">
                  <Skeleton className="w-[147px] h-[26px]" />
                  <Skeleton className="w-[58px] h-2.5" />
                </div>
                <Skeleton className="w-[240px] sm:w-[318px] h-[54px] sm:h-[76px]" />
              </div>
              <Repeat2 className="stroke-foreground opacity-75 relative md:top-3 top-1" />
              <div className="w-max">
                <div className="flex justify-between items-center w-full mb-2">
                  <Skeleton className="w-[130px] h-[26px]" />
                  <Skeleton className="w-[58px] h-2.5" />
                </div>
                <Skeleton className="w-[240px] sm:w-[318px] h-[54px] sm:h-[76px]" />
              </div>
            </div>
            <div className="flex items-center justify-between w-full mb-2">
              <Skeleton className="w-[147px] h-[26px]" />
              <Skeleton className="w-[58px] h-3.5" />
            </div>
            <Skeleton className="w-full h-12" />
            <div className="flex items-center justify-between w-full my-5 gap-5 max-w-xl mx-auto">
              <Skeleton className="max-w-20 w-full h-11" />
              <Skeleton className="h-2.5 w-full" />
              <Skeleton className="w-fit min-w-20 h-11" />
            </div>
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      </Paper>
    </>
  )
}
