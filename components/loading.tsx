import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>
      <Loader2 className='animate-spin' />
      <h3>Loading...</h3>
    </div>
  )
}
