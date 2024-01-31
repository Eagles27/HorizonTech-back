import getFormAnswersHandler from '@/handlers/getFormAnswersHandler'
import { ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '@/schema/error'
import { FORM_ANSWERS } from '@/schema/form_answer'
import { USER_HEADER } from '@/schema/user'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  headers: USER_HEADER,
  response: {
    200: FORM_ANSWERS,
    401: ERROR_UNAUTHORIZED,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['user'],
}

const getFormAnswers: FastifyPluginAsync = async (fastify) => {
  fastify.get('/form_answers', { schema }, getFormAnswersHandler)
}

export default getFormAnswers
