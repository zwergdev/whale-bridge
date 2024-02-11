import { toast } from 'sonner'

export const truncatedToaster = (message: string, description: string) => {
  return toast(message, {
    description: `${description?.slice(0, 400)}${
      description.length > 400 ? '...' : ''
    }`,
  })
}

export const errorToaster = (error: Error) => {
  console.error(error)

  if (
    error?.message.includes('insufficient balance') ||
    error?.message.includes('The total cost')
  )
    return toast('Error occurred!', {
      description: 'Insufficient balance.',
    })
}
