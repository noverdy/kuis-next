'use server'

import quizModel from '@/models/quizModel'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function action(formData, quizId) {
  const question = {
    title: formData.get('title'),
    options: [],
    answers: [],
  }

  formData.forEach((v, k) => {
    if (k.startsWith('answer-')) {
      question.options.push(v)
    }
    if (k.startsWith('correct-')) {
      question.answers.push(parseInt(k.split('-')[1]))
    }
  })
  const err = await quizModel.findByIdAndUpdate(quizId, {
    $push: {
      questions: question,
    },
  })

  console.log(err)

  cookies().set('toast', 'Questions added successfully.', {
    expires: new Date(Date.now() + 3 * 1000), // 3 seconds
  })
  revalidatePath(`/quiz/${quizId}/question/add`)
}
