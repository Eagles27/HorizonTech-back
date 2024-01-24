import { FastifyReply, FastifyRequest } from 'fastify'
import requireAuth from '@/middleware/requireAuth'
import { USER_MONGOOSE } from '@/schema/mongoose'
import { TUser } from '@/schema/user'

type TRequest = FastifyRequest<{
  Headers: {
    authorization: string
  }
}>

const getMarraineHandler = async (req: TRequest, res: FastifyReply) => {
  const userId = await requireAuth(req, res)
  if (!userId) return

  try {
    const marraineResponse = await USER_MONGOOSE.find({ role: 'Marraine' }).select(
      '_id firstname lastname email finishedSignup role'
    )

    const marraine: TUser[] = marraineResponse.map((userResponse) => ({
      _id: userResponse._id.toString(),
      firstname: userResponse.firstname,
      lastname: userResponse.lastname,
      email: userResponse.email,
      finishedSignup: userResponse.finishedSignup,
      role: userResponse.role,
    }))

    res.send(marraine)
  } catch (error) {
    console.error(error)
    res.internalServerError()
  }
}

export default getMarraineHandler
