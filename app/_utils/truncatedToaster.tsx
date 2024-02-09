import { toast } from 'sonner'

export const truncatedToaster = (message: string, description: string) => {
  return toast(message, {
    description: `${description?.slice(0, 400)}${
      description.length > 400 ? '...' : ''
    }`,
  })
}
