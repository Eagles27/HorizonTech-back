const defaultPinoConfig = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname,reqId,responseTime,req,res',
    },
  },
}

const loggerConfig = {
  local: defaultPinoConfig,
  dev: defaultPinoConfig,
  production: true,
  test: false,
}

export default loggerConfig
