import getFormAnswerWithIdHandler from '@/handlers/postFormAnswersIdHandler'
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

const getFormAnswerWithId: FastifyPluginAsync = async (fastify) => {
  fastify.get('/form_answers/:id', { schema }, getFormAnswerWithIdHandler)
}

export default getFormAnswerWithId
