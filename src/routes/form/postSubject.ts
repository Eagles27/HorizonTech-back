import postFormHandler from '@/handlers/postFormHandler'
import { ERROR_BAD_REQUEST, ERROR_CONFLICT, ERROR_INTERNAL_SERVER_ERROR } from '@/schema/error'
import { FORM_POST_BODY, FORM_RESPONSE } from '@/schema/form_answer'

import { FastifyPluginAsync, FastifySchema } from 'fastify'

// Ajouter les réponses
const schema: FastifySchema = {
  body: FORM_POST_BODY,
  response: {
    201: FORM_RESPONSE,
    409: ERROR_CONFLICT,
    400: ERROR_BAD_REQUEST,
    500: ERROR_INTERNAL_SERVER_ERROR,
  },

  tags: ['form'],
}

const postForm: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post('/reponsesform', { schema }, postFormHandler)
}

export default postForm
