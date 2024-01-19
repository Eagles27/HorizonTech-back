import envConfig from '@/configs/envConfig'
import { USER_MONGOOSE } from '@/schema/mongoose'
import { TUserId } from '@/schema/user'
import { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

type TRequest = FastifyRequest<{
  Headers: {
    authorization: string
  }
}>

const requireAuth = async (req: TRequest, res: FastifyReply): Promise<TUserId | null> => {
  // Vérification de la présence du token
  const { authorization } = req.headers

  if (authorization) {
    const token = authorization?.split(' ')[1] // authorization: Bearer <token>

    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id } = jwt.verify(token, envConfig.JWT_SECRET) as { _id: string }
      const userId = (await USER_MONGOOSE.findOne({ _id }).select('_id')) as TUserId
      return userId
    } catch (error) {
      res.unauthorized('Invalid Token')
      return null
    }
  }
  res.unauthorized('No token provided')
  return null
}

export default requireAuth
