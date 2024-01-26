import getMarraineHandler from '@/handlers/getMarrainesInfoHandler'
import { ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '@/schema/error'
import { USERS } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  response: {
    200: USERS,
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['user'],
}

const getMarraineInfo: FastifyPluginAsync = async (fastify) => {
  fastify.get('/info_marraine', { schema }, getMarraineHandler)
}

export default getMarraineInfo
