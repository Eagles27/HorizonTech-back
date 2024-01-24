import getMarraineHandler from '@/handlers/getMarrainesInfoHandler'
import { ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '@/schema/error'
import { MARRAINE_INFO } from '@/schema/info_marraine'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  response: {
    200: MARRAINE_INFO,
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['marraine'],
}

const getMarraineInfo: FastifyPluginAsync = async (fastify) => {
  fastify.get('/info_marraine', { schema }, getMarraineHandler)
}

export default getMarraineInfo
