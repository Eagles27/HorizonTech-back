import USER_MONGOOSE from '@/schema/mongoose'
import { TUserPostBody, USER_POST_BODY } from '@/schema/user'
import { FastifyReply, FastifyRequest } from 'fastify'

type TRequest = FastifyRequest<{
  Body: TUserPostBody
}>

const postUserHandler = async (req: TRequest, res: FastifyReply) => {
  try {
    // Validation des données avec Zod
    USER_POST_BODY.parse(req.body)

    // Vérifier que l'utilisateur n'existe pas déjà
    const userExists = await USER_MONGOOSE.exists({ email: req.body.email })
    if (userExists) throw new Error('User already exists')

    // Ajouter l'utilisateur en base de données
    const user = await USER_MONGOOSE.create(req.body)
    res.code(201).send(user)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User already exists') {
        res.conflict(error.message)
        return
      }
      res.badRequest(error.message)
      return
    }
    res.internalServerError()
  }
}

export default postUserHandler
