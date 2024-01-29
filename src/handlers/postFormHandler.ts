import { FORM_ANSWER_MONGOOSE, USER_MONGOOSE } from '@/schema/mongoose'
import { FORM_POST_BODY, TFormPostBody, TFormResponse } from '@/schema/form_answer'
import { FastifyReply, FastifyRequest } from 'fastify'
import requireAuth from '@/middleware/requireAuth'

type TRequest = FastifyRequest<{
  Headers: {
    authorization: string
  }
  Body: TFormPostBody
}>

const postFormHandler = async (req: TRequest, res: FastifyReply) => {
  const userId = await requireAuth(req, res)
  if (!userId) return

  try {
    // Validation des données avec Zod
    FORM_POST_BODY.parse(req.body)

    // On recupere le userId de l'utilisateur et on l'ajoute a notre schema
    const formData = {
      user_id: userId._id,
      responses: (req.body as TFormPostBody).responses,
    }
    const formAnswersExists = await FORM_ANSWER_MONGOOSE.exists({ user_id: userId._id })
    if (formAnswersExists) throw new Error('Form already exists')

    // Ajouter le form en base de données
    const formResponse = await FORM_ANSWER_MONGOOSE.create(formData)
    const form: TFormResponse = {
      _id: formResponse._id.toString(),
    }
    if (formResponse) {
      const user = await USER_MONGOOSE.findOneAndUpdate({ _id: userId._id }, { finishedSignup: true })
      if (!user) throw new Error('User path failed')
    }
    res.code(201).send(form)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Form already exists') {
        res.conflict(error.message)
        return
      }
      if (error.message === 'User path failed') {
        res.internalServerError()
        return
      }
      res.badRequest(error.message)
      return
    }
    res.internalServerError()
  }
}

export default postFormHandler
