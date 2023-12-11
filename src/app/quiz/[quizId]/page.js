import connectDB from '@/lib/db'
import quizModel from '@/models/quizModel'
import { isValidObjectId } from 'mongoose'
import Link from 'next/link'

export default async function Detail({ params }) {
  await connectDB()

  const quizId = params.quizId
  if (!isValidObjectId(quizId)) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-xl font-semibold lg:text-5xl'>Quiz not found.</h1>
      </div>
    )
  }

  const quiz = await quizModel.findById(quizId).exec()
  if (!quiz) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-xl font-semibold lg:text-5xl'>Quiz not found.</h1>
      </div>
    )
  }

  return (
    <div className='flex h-screen flex-col gap-4 p-5 lg:p-16'>
      <main className='grow rounded-3xl bg-white/30 p-8'>
        <div className='text-center lg:mb-4'>
          <h1 className='font-semibold lg:mb-2 lg:text-5xl'>{quiz.title}</h1>
          <h2 className='lg:text-2xl'>
            Created at {quiz._id.getTimestamp().toLocaleString()}
          </h2>
        </div>
        <hr className='mb-4 opacity-50' />
        <p className='text-lg'>Description:</p>
        <p>{quiz.description}</p>
      </main>
      <Link
        href={`/quiz/${quizId}/question/1`}
        className='rounded-3xl bg-green-500/60 p-4 text-center transition-colors hover:bg-green-500/80'
      >
        Start Quiz
      </Link>
    </div>
  )
}
