import getAnswersIdHandler from '@/handlers/getAnswersIdHandler'
import { ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '@/schema/error'
import { FORM_ANSWERS } from '@/schema/form_answer'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  response: {
    200: FORM_ANSWERS,
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['user'],
}

const getAnswersId: FastifyPluginAsync = async (fastify) => {
  fastify.post('/answers_id', { schema }, getAnswersIdHandler)
}

export default getAnswersId
