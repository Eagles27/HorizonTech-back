import getWaitingContactsHandler from '@/handlers/getWaitingContactsHandler'
import { ERROR_UNAUTHORIZED, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER_ERROR } from '@/schema/error'
import { USERS, USER_HEADER } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  headers: USER_HEADER,
  response: {
    200: USERS || [],
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['user'],
}

const getWaitingContacts: FastifyPluginAsync = async (fastify) => {
  fastify.get('/waiting_contacts', { schema }, getWaitingContactsHandler)
}

export default getWaitingContacts
