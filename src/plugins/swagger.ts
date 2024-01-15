import Swagger from '@fastify/swagger'
import fp from 'fastify-plugin'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { swaggerConfig, swaggerUIConfig } from '../configs/swaggerConfig'

export default fp(async (fastify) => {
  fastify.register(Swagger, swaggerConfig)

  fastify.register(fastifySwaggerUi, swaggerUIConfig)
})
