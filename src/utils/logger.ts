import pino from 'pino'

const getLogger = (name: string) => {
  const logger = pino(
    pino.transport({
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        colorize: true,
        levelLabel: `${name}`,
        ignore: 'pid,hostname,reqId,responseTime,req,res',
        messageFormat: `${name} - {msg}`,
      },
    })
  )
  return logger
}

export default getLogger
