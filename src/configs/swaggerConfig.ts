import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import envConfig from './envConfig'

const swaggerConfig = {
  mode: 'dynamic',
  openapi: {
    info: {
      title: 'API',
      description: 'API documentation',
      version: '0.1.0',
    },
    host: `0.0.0.0:${envConfig.PORT}`,
    servers: [{ url: envConfig.NODE_ENV === 'local' ? '/' : '/api' }],
    components: {
      securitySchemes: {
        apiKey: {
          description: 'Authorization header token, sample: "Bearer #TOKEN#"',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    security: [
      {
        apiKey: [],
      },
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  hideUntagged: false,
  transform: jsonSchemaTransform,
} as FastifyDynamicSwaggerOptions

const swaggerUIConfig: FastifySwaggerUiOptions = {
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
    defaultModelExpandDepth: 7,
    defaultModelRendering: 'model',
    persistAuthorization: true,
  },
  uiHooks: {
    onRequest(request, reply, next) {
      next()
    },
    preHandler(request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => swaggerObject,
  transformSpecificationClone: true,
}

export { swaggerConfig, swaggerUIConfig }
