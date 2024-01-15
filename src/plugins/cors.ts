import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import { FastifyRequest } from 'fastify/types/request'

export default fp(async (fastify) => {
  fastify.register(cors, () => (req: FastifyRequest, callback: any) => {
    const corsOptions = {
      origin: true,
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  })
})
