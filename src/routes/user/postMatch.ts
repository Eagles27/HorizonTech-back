import postMatchHandler from '@/handlers/postMatchHandler'
import { ERROR_CONFLICT, ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '@/schema/error'
import { USER_HEADER, USER_ID, USER_POST_MATCH_BODY } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  headers: USER_HEADER,
  body: USER_POST_MATCH_BODY,
  response: {
    200: USER_ID,
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    409: ERROR_CONFLICT,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
}

const postMatch: FastifyPluginAsync = async (fastify) => {
  fastify.post('/match', { schema }, postMatchHandler)
}

export default postMatch
