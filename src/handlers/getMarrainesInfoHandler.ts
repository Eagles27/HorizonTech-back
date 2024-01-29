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
    const user = (await USER_MONGOOSE.findById(userId)) as TUser
    if (!user) throw new Error('User not found')

    const contactIds = user.contacts?.map((contact) => contact.contact_id) || []

    const marraineResponse = await USER_MONGOOSE.find({
      role: 'Marraine',
      _id: { $nin: contactIds },
    }).select('_id firstname lastname email finishedSignup role')

    if (!marraineResponse) throw new Error('Marraines not found')
    
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
    if (error instanceof Error) {
      console.error(error)
      if (error.message === 'User not found') res.notFound(error.message)
      if (error.message === 'Marraines not found') res.notFound(error.message)
    }
    res.internalServerError()
  }
}

export default getMarraineHandler
