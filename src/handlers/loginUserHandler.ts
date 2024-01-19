import { USER_MONGOOSE } from '@/schema/mongoose'
import { TUserPostBodyLogin, USER_POST_BODY_LOGIN } from '@/schema/user'
import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import envConfig from '@/configs/envConfig'

type TRequest = FastifyRequest<{
  Body: TUserPostBodyLogin
}>

const loginUserHandler = async (req: TRequest, res: FastifyReply) => {
  try {
    // Validation des données avec Zod
    USER_POST_BODY_LOGIN.parse(req.body)

    // Vérifier que l'utilisateur existe
    const user = await USER_MONGOOSE.findOne({ email: req.body.email })
    if (!user) throw new Error('User does not exist')

    // Vérifier que le mot de passe est correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) throw new Error('Invalid password')

    // Générer un token
    const token = jwt.sign({ _id: user._id }, envConfig.JWT_SECRET)

    // Ajouter le token dans le header de la réponse
    res.code(200).send({ token })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User does not exist' || error.message === 'Invalid password') {
        res.unauthorized(error.message)
        return
      }
      res.badRequest(error.message)
    }
    res.internalServerError()
  }
}

export default loginUserHandler
