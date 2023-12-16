import connectDB from '@/lib/db'
import quizModel from '@/models/quizModel'
import Link from 'next/link'
import QuestionOptions from './QuestionOptions'
import Image from 'next/image'

export default async function Question({ params }) {
  await connectDB()

  const { quizId, id } = params
  const quiz = await quizModel.findById(quizId).exec()
  const question = quiz.questions[id - 1]

  return (
    <main className='flex h-screen flex-col gap-4 p-5 lg:p-12'>
      <section className='rounded-3xl border-2 border-white/50 p-4 flex items-center flex-col gap-4 shadow-md lg:px-8 lg:py-20 '>
        <p className='text-md lg:text-2xl'>{question.title}</p>
        <MediaRenderer base64Data={question.attachment} />
      </section>
      <section className='grid grow gap-4 lg:grid-cols-2'>
        <QuestionOptions
          options={question.options}
          quizId={quizId}
          id={id - 1}
        />
      </section>
      <section className='flex items-center justify-center gap-4 pb-4'>
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

function MediaRenderer({ base64Data }) {
  if (!base64Data) return null;

  // Extract MIME type and Base64 content
  const [mimeType, content] = base64Data.match(/^data:(.*);base64,(.*)$/).slice(1);

  // Decide the media type and render accordingly
  if (mimeType.startsWith('image/')) {
    return <Image src={base64Data} alt='Uploaded Content' width={256} height={256} />
  } else if (mimeType.startsWith('video/')) {
    return (
      <video controls>
        <source src={base64Data} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    );
  } else if (mimeType.startsWith('audio/')) {
    return (
      <audio controls>
        <source src={base64Data} type={mimeType} />
        Your browser does not support the audio element.
      </audio>
    );
  }

  // Handle unknown types
  return <p>Unsupported media type: {mimeType}</p>;
}