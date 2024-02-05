import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const RedeemCode = () => {
  return (
    <>
      <h5>Redeem code:</h5>
      <div className="flex items-center justify-center gap-5">
        <Input /> <Button>Redeem</Button>
      </div>
    </>
  )
}
