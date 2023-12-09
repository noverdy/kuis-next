export default function Detail({ params }) {
  const slug = params.slug

  return (
    <div className='flex h-screen flex-col gap-4 p-5 lg:p-16'>
      <main className='grow rounded-3xl bg-white/30 p-8'>
        <div className='text-center lg:mb-4'>
          <h1 className='font-semibold lg:mb-2 lg:text-5xl'>Quiz Title</h1>
          <h2 className='lg:text-2xl'>Created at Date</h2>
        </div>
        <hr className='mb-4 opacity-50' />
        <p className='text-lg'>Description:</p>
        <p>Lorem ipsum</p>
      </main>
      <button className='rounded-3xl bg-green-500/60 p-4 transition-colors hover:bg-green-500/80'>
        Start Quiz
      </button>
    </div>
  )
}
