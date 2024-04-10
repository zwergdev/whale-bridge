import { Loader } from '@/components/ui/icons'
export default function ProfileLoading() {
  return (
    <div className="flex-row-center h-[calc(100vh-160px)] w-screen">
      <Loader className="h-8 w-8 animate-spin-slow" />
    </div>
  )
}
