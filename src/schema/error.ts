import { z } from 'zod'

const ERROR_CONFLICT = z.object({
  statusCode: z.literal(409),
  error: z.string(),
  message: z.string(),
})

const ERROR_BAD_REQUEST = z.object({
  statusCode: z.literal(400),
  error: z.string(),
  message: z.string(),
})

const ERROR_NOT_FOUND = z.object({
  statusCode: z.literal(404),
  error: z.string(),
  message: z.string(),
})

const ERROR_INTERNAL_SERVER_ERROR = z.object({
  statusCode: z.literal(500),
  error: z.string(),
  message: z.string(),
})

export type TError = z.infer<typeof ERROR_CONFLICT>
export type TErrorBadRequest = z.infer<typeof ERROR_BAD_REQUEST>
export type TErrorNotFound = z.infer<typeof ERROR_NOT_FOUND>
export type TErrorInternalServerError = z.infer<typeof ERROR_INTERNAL_SERVER_ERROR>

export { ERROR_CONFLICT, ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER_ERROR }
