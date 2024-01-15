import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test', 'local']).default('dev'),
  PORT: z.string().transform((port) => parseInt(port, 10)),
})

const envConfig = envSchema.parse(process.env)

export default envConfig
