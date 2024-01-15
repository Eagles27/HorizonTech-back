import fastify, { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import envConfig from './configs/envConfig'
import appConfigPlugin from './appConfig'
import loggerConfig from './configs/loggerConfig'
import connect from './services/mongodb'

const instance: FastifyInstance = fastify({
  logger: loggerConfig[envConfig.NODE_ENV],
})

function start(): void {
  try {
    const port = envConfig.PORT
    const host = '0.0.0.0'

    instance.listen({ port, host })
    instance.register(fp(appConfigPlugin), {})
    // Connect to MongoDB
    connect()
  } catch (err) {
    instance.log.error(err)
  }
}

start()
