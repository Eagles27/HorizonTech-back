import { FORM_MONGOOSE } from '@/schema/mongoose'
import { TForm } from '@/schema/form'
import { FastifyReply, FastifyRequest } from 'fastify'

const getFormHandler = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const formResponses = await FORM_MONGOOSE.find().select('_id question response')
    if (!formResponses) throw new Error('Form not found')

    const form: TForm = formResponses.map((elements: any) => ({
      _id: elements._id.toString(),
      question: elements.question,
      response: elements.response,
    }))
    // const formMap: TFormElement = {
    //   _id: formResponse._id.toString(),
    //   question: formResponse.question,
    //   response: formResponse.response,
    // }
    res.send(form)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error.message === 'Form not found') res.notFound(error.message)
    }
    res.internalServerError()
  }
}

export default getFormHandler
