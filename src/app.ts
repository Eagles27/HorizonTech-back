import fastify, { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import envConfig from './configs/envConfig'
import appConfigPlugin from './appConfig'
import loggerConfig from './configs/loggerConfig'

const instance: FastifyInstance = fastify({
  logger: loggerConfig[envConfig.NODE_ENV],
})

function start(): void {
  try {
    const port = envConfig.PORT
    const host = '0.0.0.0'

    instance.listen({ port, host })
    instance.register(fp(appConfigPlugin), {})
  } catch (err) {
    instance.log.error(err)
  }
}

start()
