import requireAuth from '@/middleware/requireAuth'
import { TFormAnswers } from '@/schema/form_answer'
import { FORM_ANSWER_MONGOOSE, USER_MONGOOSE } from '@/schema/mongoose'
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

        const formAnswer = (await FORM_ANSWER_MONGOOSE.findOne({ user_id: contactUser._id })) as TFormAnswers
        return {
          _id: contactUser._id.toString(),
          firstname: contactUser.firstname,
          lastname: contactUser.lastname,
          email: contactUser.email,
          finishedSignup: contactUser.finishedSignup,
          role: contactUser.role,
          formAnswer: {
            _id: formAnswer._id.toString(),
            user_id: formAnswer.user_id.toString(),
            responses: formAnswer.responses.map((response) => ({
              _id: response._id.toString(),
              question: response.question,
              response: response.response,
            })),
          },
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
