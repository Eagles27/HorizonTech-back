import getUserInfoHandler from '@/handlers/getUserInfoHandler'
import { ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '@/schema/error'
import { USER, USER_HEADER } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  headers: USER_HEADER,
  response: {
    200: USER,
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['user'],
}

const getUserInfo: FastifyPluginAsync = async (fastify) => {
  fastify.get('/info', { schema }, getUserInfoHandler)
}

export default getUserInfo
