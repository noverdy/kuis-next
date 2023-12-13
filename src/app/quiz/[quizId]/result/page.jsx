import connectDB from '@/lib/db'
import quizModel from '@/models/quizModel'
import Link from 'next/link'
import QuizScore from './QuizScore'
import UserName from './UserName'

export default async function Result({ params }) {
  const { quizId } = params

  await connectDB()
  const quiz = await quizModel.findById(quizId).exec()
  const answers = quiz.questions.map((question) => question.answers)

  return (
    <main className='p-5 lg:p-16'>
      <section className='mb-4 lg:mb-8'>
        <h1 className='mb-2 text-4xl font-semibold lg:mb-4 lg:text-7xl'>
          Final Result
        </h1>
        <h2 className='mb-24 lg:text-3xl'>
          Hello <UserName />, congratulations for finishing the quiz. Your final
          score is:
        </h2>

        <QuizScore answers={answers} quizId={quizId} />

        <Link
          href='/'
          className='rounded-lg border border-white/50 px-4 py-2 text-lg'
        >
          Back to Home
        </Link>
      </section>
    </main>
  )
}
