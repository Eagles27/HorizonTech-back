import requireAuth from '@/middleware/requireAuth'
import { USER_MONGOOSE } from '@/schema/mongoose'
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
    const userResponse = await USER_MONGOOSE.findOne({ _id: userId }).select(
      '_id firstname lastname email finishedSignup role'
    )
    if (!userResponse) throw new Error('User not found')
    const user: TUser = {
      _id: userResponse._id.toString(),
      firstname: userResponse.firstname,
      lastname: userResponse.lastname,
      email: userResponse.email,
      finishedSignup: userResponse.finishedSignup,
      role: userResponse.role,
    }
    res.send(user)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error.message === 'User not found') {
        res.notFound(error.message)
        return
      }
    }
    res.internalServerError()
  }
}

export default getUserInfoHandler
