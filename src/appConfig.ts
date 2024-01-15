import { join } from 'path'
import AutoLoad from '@fastify/autoload'
import { FastifyPluginAsync } from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

const appConfigPlugin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)
  fastify.withTypeProvider<ZodTypeProvider>()

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {
      prefix: '/',
    },
  })
}

export default appConfigPlugin
