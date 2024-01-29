import { FastifyReply, FastifyRequest } from 'fastify'
import { FORM_ANSWER_MONGOOSE } from '@/schema/mongoose'
import { TFormAnswers } from '@/schema/form_answer'

type TRequest = FastifyRequest<{
  Body: {
    userId: string
  }
}>

const getFormAnswersHandler = async (req: TRequest, res: FastifyReply) => {
  const { userId } = req.body
  if (!userId) return
  try {
    const formResponses = await FORM_ANSWER_MONGOOSE.findOne({ user_id: userId })

    if (!formResponses) throw new Error('Form not found')
    const formAnswer: TFormAnswers = {
      _id: formResponses._id.toString(),
      user_id: formResponses.user_id.toString(),
      responses: formResponses.responses.map((response) => ({
        _id: response._id.toString(),
        question: response.question,
        response: response.response,
      })),
    }

    res.send(formAnswer)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error.message === 'Form not found') {
        res.notFound(error.message)
        return
      }
    }
    res.internalServerError()
  }
}

export default getFormAnswersHandler
