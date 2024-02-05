import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const CreateCode = () => {
  return (
    <>
      <h5>Your code:</h5>
      <div className="flex items-center justify-center gap-5">
        <Input /> <Button>Create</Button>
      </div>
    </>
  )
}
