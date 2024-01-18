import loginUserHandler from '@/handlers/loginUserHandler'
import { ERROR_BAD_REQUEST, ERROR_INTERNAL_SERVER_ERROR, ERROR_UNAUTHORIZED } from '@/schema/error'
import { USER_LOGIN_RESPONSE, USER_POST_BODY_LOGIN } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  body: USER_POST_BODY_LOGIN,
  response: {
    200: USER_LOGIN_RESPONSE,
    401: ERROR_UNAUTHORIZED,
    400: ERROR_BAD_REQUEST,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['user'],
}

const login: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post('/login', { schema }, loginUserHandler)
}

export default login
