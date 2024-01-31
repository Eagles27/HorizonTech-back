import requireAuth from '@/middleware/requireAuth'
import { USER_MONGOOSE } from '@/schema/mongoose'
import { TUser, TUserContacts, TUserPostMatchBody, USER_POST_MATCH_BODY } from '@/schema/user'
import { FastifyReply, FastifyRequest } from 'fastify'

type TRequest = FastifyRequest<{
  Headers: {
    authorization: string
  }
  Body: TUserPostMatchBody
}>

const postAcceptInvitationHandler = async (req: TRequest, res: FastifyReply) => {
  const userId = await requireAuth(req, res)
  if (!userId) return

  try {
    const userMongoose = await USER_MONGOOSE.findById(userId)
    const user = userMongoose as unknown as TUser
    if (!user) throw new Error('User not found')

    USER_POST_MATCH_BODY.parse(req.body)

    const contact = user.contacts?.find((contactItem) => contactItem.contact_id === req.body.contact_id)
    if (!contact) throw new Error('Contact not found')

    // update user
    contact.invitationAccepted = true
    const userUpdated = (await userMongoose?.save()) as unknown as TUser

    const newContacts = userUpdated.contacts?.map(({ contact_id, invitationAccepted }) => ({
      contact_id,
      invitationAccepted,
    })) as TUserContacts

    res.code(201).send(newContacts)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'User not found') {
        res.notFound(error.message)
        return
      }
      if (error.message === 'Contact not found') {
        res.notFound(error.message)
        return
      }
      res.internalServerError(error.message)
      return
    }
    res.internalServerError()
  }
}

export default postAcceptInvitationHandler
