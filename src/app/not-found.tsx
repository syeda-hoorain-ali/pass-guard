import Link from 'next/link'
const page = () => {
  return (
    <div className='flex items-center justify-center flex-col gap-5 py-20'>
      <h1 className='font-bold text-8xl'>404</h1>
      <h2 className='text-2xl'>Page Not Found</h2>
      <h3 className='text-xl text-blue-700 underline hover:no-underline'>
        <Link href='/'>Back to home</Link>
      </h3>
    </div>
  )
}

export default page