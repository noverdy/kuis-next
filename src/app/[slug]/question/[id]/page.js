export default function Question({ params }) {
  const colors = [
    'bg-red-400/30',
    'bg-blue-400/30',
    'bg-green-400/30',
    'bg-yellow-400/30',
  ]

  const id = params.id
  const totalQuestion = 10

  const answers = [
    {
      id: 1,
      text: 'Answer one',
    },
    {
      id: 2,
      text: 'Answer two',
    },
    {
      id: 3,
      text: 'Answer three',
    },
    {
      id: 4,
      text: 'Answer four',
    },
  ]

  return (
    <main className='flex h-screen flex-col gap-4 p-5 lg:p-16'>
      <section className='rounded-3xl bg-white/30 p-4 text-center lg:px-8 lg:py-12'>
        <p className='mb-1 text-sm lg:mb-2 lg:text-base'>
          {id}/{totalQuestion}
        </p>
        <p className='text-md lg:text-2xl'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </section>
      <section className='grid grow grid-cols-2 gap-4'>
        {answers.map((answer, index) => (
          <button
            key={answer.id}
            className={`rounded-3xl ${colors[index]} text-md text-center transition-all hover:brightness-125 lg:p-4 lg:text-2xl`}
          >
            {answer.text}
          </button>
        ))}
      </section>
    </main>
  )
}
