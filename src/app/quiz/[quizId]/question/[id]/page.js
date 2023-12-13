import connectDB from '@/lib/db'
import quizModel from '@/models/quizModel'
import Link from 'next/link'
import QuestionOptions from './QuestionOptions'

export default async function Question({ params }) {
  await connectDB()

  const { quizId, id } = params
  const quiz = await quizModel.findById(quizId).exec()
  const question = quiz.questions[id - 1]

  return (
    <main className='flex h-screen flex-col gap-4 p-5 lg:p-12'>
      <section className='rounded-3xl border-2 border-white/50 p-4 text-center shadow-md lg:px-8 lg:py-20'>
        <p className='text-md lg:text-2xl'>{question.title}</p>
      </section>
      <section className='grid grow gap-4 lg:grid-cols-2'>
        <QuestionOptions
          options={question.options}
          quizId={quizId}
          id={id - 1}
        />
      </section>
      <section className='flex items-center justify-center gap-4'>
        {[...Array(quiz.questions.length)].map((_, i) => (
          <Link
            key={i}
            href={`/quiz/${quizId}/question/${i + 1}`}
            className={
              `grid h-12 w-12 place-items-center rounded-lg border border-white/50 transition-all hover:bg-white/30` +
              (id == i + 1 ? ' bg-white/30' : '')
            }
          >
            {i + 1}
          </Link>
        ))}
        <Link
          href={`/quiz/${quizId}/result`}
          className='grid h-12 place-items-center rounded-lg border border-white/50 px-4 transition-all hover:bg-white/30'
        >
          Submit
        </Link>
      </section>
    </main>
  )
}
