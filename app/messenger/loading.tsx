import { Loader } from 'lucide-react'
export default function MessengerLoading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-160px)] w-screen">
      <Loader className="h-8 w-8 animate-spin-slow" />
    </div>
  )
}
