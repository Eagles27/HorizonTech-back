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

const postMatchHandler = async (req: TRequest, res: FastifyReply) => {
  const userId = await requireAuth(req, res)
  if (!userId) return
  try {
    USER_POST_MATCH_BODY.parse(req.body)

    const contactExist = await USER_MONGOOSE.exists({ _id: req.body.contact_id })
    if (!contactExist) throw new Error('Contact does not exist')

    // Check if contact is not already in contacts
    const user = (await USER_MONGOOSE.findOne({ _id: userId })) as TUser
    const alreadyContact = user.contacts?.find((contact) => contact.contact_id === req.body.contact_id)
    if (alreadyContact) throw new Error('Contact already in contacts')

    // Update user
    const updatedUser = (await USER_MONGOOSE.findOneAndUpdate(
      { _id: userId },
      { $push: { contacts: { contact_id: req.body.contact_id, invitationAccepted: true } } },
      { new: true }
    )) as TUser
    if (!updatedUser) throw new Error('User not found')

    // Update contact
    await USER_MONGOOSE.findOneAndUpdate(
      { _id: req.body.contact_id },
      { $push: { contacts: { contact_id: userId._id } } },
      { new: true }
    )

    const contacts = updatedUser.contacts?.map(({ contact_id, invitationAccepted }) => ({
      contact_id,
      invitationAccepted,
    })) as TUserContacts

    res.code(201).send(contacts)
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'Contact does not exist':
          res.notFound(error.message)
          return
        case 'Contact already in contacts':
          res.conflict(error.message)
          return
        case 'User not found':
          res.notFound(error.message)
          return
        default:
          res.badRequest(error.message)
          return
      }
    }
    res.internalServerError()
  }
}

export default postMatchHandler
