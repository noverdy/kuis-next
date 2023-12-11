import connectDB from '@/lib/db'
import quizModel from '@/models/quizModel'

export default async function Question({ params }) {
  await connectDB()

  const { quizId, id } = params
  const quiz = await quizModel.findById(quizId).exec()
  const question = quiz.questions[id - 1]

  return (
    <main className='flex h-screen flex-col gap-4 p-5 lg:p-16'>
      <section className='rounded-3xl border-2 border-white/50 p-4 text-center shadow-md lg:px-8 lg:py-12'>
        <p className='mb-1 text-sm lg:mb-2 lg:text-base'>
          {id}/{quiz.questions.length}
        </p>
        <p className='text-md lg:text-2xl'>{question.title}</p>
      </section>
      <section className='grid grow gap-4 lg:grid-cols-2'>
        <QuestionOptions options={question.options} />
      </section>
    </main>
  )
}

function QuestionOptions({ options }) {
  'use client'

  return (
    <>
      {options.map((option, i) => (
        <button
          key={i}
          className={`text-md rounded-3xl bg-white/30 text-center transition-all hover:bg-white/50 lg:p-4 lg:text-2xl`}
        >
          {option}
        </button>
      ))}
    </>
  )
}
