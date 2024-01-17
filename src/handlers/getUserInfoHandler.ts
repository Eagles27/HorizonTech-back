import requireAuth from '@/middleware/requireAuth'
import USER_MONGOOSE from '@/schema/mongoose'
import { TUser } from '@/schema/user'
import { FastifyReply, FastifyRequest } from 'fastify'

type TRequest = FastifyRequest<{
  Headers: {
    authorization: string
  }
}>

const getUserInfoHandler = async (req: TRequest, res: FastifyReply) => {
  const userId = await requireAuth(req, res)
  if (!userId) return

  try {
    const user = (await USER_MONGOOSE.findOne({ _id: userId }).select('_id firstname lastname email')) as TUser
    if (!user) throw new Error('User not found')
    res.send(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error.message === 'User not found') res.notFound(error.message)
    }
    res.internalServerError()
  }
}

export default getUserInfoHandler
