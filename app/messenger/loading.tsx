import { Paper, Skeleton } from '@/components/ui'
import { Repeat2 } from '@/components/ui/icons'
export default function MessengerLoading() {
  return (
    <>
      <Paper title="MESSENGER">
        <div className="flex-container-between-col md:mb-5 mb-7 gap-3">
          <div className="max-[525px]:w-full w-max lg:w-full max-lg:mx-auto">
            <Skeleton className="w-11 h-5 mb-2.5" />
            <Skeleton className="max-[525px]:w-full max-lg:w-[430px] w-full  h-[106px] lg:h-[50px]" />
          </div>
          <Repeat2 className="stroke-foreground opacity-75 relative md:top-3 top-1" />
          <div className="max-[525px]:w-full w-max lg:w-full max-lg:mx-auto">
            <Skeleton className="w-11 h-5 mb-2.5" />
            <Skeleton className="max-[525px]:w-full max-lg:w-[430px] w-full h-[106px] lg:h-[50px]" />
          </div>
        </div>
        <Skeleton className="w-[175px] h-5 mb-2.5 mt-4" />
        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-12 mt-5" />
      </Paper>
    </>
  )
}
