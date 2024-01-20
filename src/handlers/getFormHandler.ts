import { TForm } from '@/schema/form'
import { FORM_MONGOOSE } from '@/schema/mongoose'
import { FastifyReply, FastifyRequest } from 'fastify'

const getFormHandler = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const formResponses = (await FORM_MONGOOSE.find()) as TForm
    if (!formResponses) throw new Error('Form not found')

    res.send(formResponses)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error.message === 'Form not found') res.notFound(error.message)
    }
    res.internalServerError()
  }
}

export default getFormHandler
