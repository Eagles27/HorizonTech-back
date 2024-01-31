import postAcceptInvitationHandler from '@/handlers/postAcceptInvitationHandler'
import { ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '@/schema/error'
import { USER_CONTACTS, USER_POST_MATCH_BODY } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  body: USER_POST_MATCH_BODY,
  response: {
    201: USER_CONTACTS,
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['user'],
}

const postAcceptInvitation: FastifyPluginAsync = async (fastify) => {
  fastify.post('/accept_invitation', { schema }, postAcceptInvitationHandler)
}

export default postAcceptInvitation
