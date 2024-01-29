import requireAuth from '@/middleware/requireAuth'
import { USER_MONGOOSE } from '@/schema/mongoose'
import { TUser } from '@/schema/user'
import { FastifyReply, FastifyRequest } from 'fastify'

type TRequest = FastifyRequest<{
  Headers: {
    authorization: string
  }
}>

const getWaitingContactsHandler = async (req: TRequest, res: FastifyReply) => {
  const userId = await requireAuth(req, res)
  if (!userId) return

  try {
    const user = (await USER_MONGOOSE.findById(userId)) as TUser
    if (!user) throw new Error('User not found')

    const waitingContacts = user.contacts?.filter((contact) => !contact.invitationAccepted) || []

    if (waitingContacts.length === 0) {
      res.send([])
      return
    }

    const contacts: TUser[] = await Promise.all(
      waitingContacts.map(async (contact) => {
        const contactUser = (await USER_MONGOOSE.findById(contact.contact_id)) as TUser
        if (!contactUser) throw new Error('Contact user not found')
        return {
          _id: contactUser._id.toString(),
          firstname: contactUser.firstname,
          lastname: contactUser.lastname,
          email: contactUser.email,
          finishedSignup: contactUser.finishedSignup,
          role: contactUser.role,
        }
      })
    )
    res.send(contacts)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User not found') res.notFound(error.message)
      else if (error.message === 'Contact user not found') res.notFound(error.message)
      else res.internalServerError(error.message)
    }
    res.internalServerError()
  }
}

export default getWaitingContactsHandler
