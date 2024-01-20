import getFormHandler from '@/handlers/getFormHandler'
import { ERROR_INTERNAL_SERVER_ERROR, ERROR_NOT_FOUND } from '@/schema/error'
import { FORM } from '@/schema/form'
import { FastifyPluginAsync, FastifySchema } from 'fastify'

const schema: FastifySchema = {
  response: {
    200: FORM,
    404: ERROR_NOT_FOUND,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },
  tags: ['form'],
}

const getFormSubject: FastifyPluginAsync = async (fastify) => {
  fastify.get('/subject', { schema }, getFormHandler)
}

export default getFormSubject
