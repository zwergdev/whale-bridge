import { LayerZero, Repeat2 } from '@/components/ui/icons'
import { Paper, Skeleton } from '@/components/ui'

export default function BridgeLoading() {
  return (
    <>
      <Paper title="NFT BRIDGE">
        <div className="relative">
          <Skeleton className="w-[111px] h-6 absolute -top-12 right-0" />
          <div className="w-full">
            <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center mb-16">
              <div className="w-max">
                <div className="flex justify-between items-center w-full mb-2">
                  <Skeleton className="w-[147px] h-[26px]" />
                  <Skeleton className="w-[58px] h-3.5" />
                </div>
                <Skeleton className="w-[240px] sm:w-[318px] h-[54px] sm:h-[76px]" />
              </div>
              <Repeat2 className="stroke-foreground opacity-75 relative md:top-3 top-1" />
              <div className="w-max">
                <Skeleton className="w-[130px] h-[26px] mb-2" />
                <Skeleton className="w-[240px] sm:w-[318px] h-[54px] sm:h-[76px]" />
              </div>
            </div>
            <Skeleton className="w-full h-12" />
            <LayerZero className="text-center w-full mt-10" />
          </div>
        </div>
      </Paper>
    </>
  )
}
