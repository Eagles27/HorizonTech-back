import postUserHandler from '@/handlers/postUserHandler'
import { ERROR_BAD_REQUEST, ERROR_CONFLICT, ERROR_INTERNAL_SERVER_ERROR } from '@/schema/error'
import { USER_LOGIN_RESPONSE, USER_POST_BODY } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  body: USER_POST_BODY,
  response: {
    201: USER_LOGIN_RESPONSE,
    409: ERROR_CONFLICT,
    400: ERROR_BAD_REQUEST,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },

  tags: ['user'],
}

const postUser: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post('/signup', { schema }, postUserHandler)
}

export default postUser
