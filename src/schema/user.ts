import { z } from 'zod'

const USER_POST_BODY = z.object({
  role: z.enum(['Etudiante', 'Marraine']),
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  finishedSignup: z.boolean().default(false),
})

const USER_POST_BODY_LOGIN = z.object({
  email: z.string().email(),
  password: z.string(),
})

const USER_LOGIN_RESPONSE = z.object({
  token: z.string(),
})

const USER_ID = z.object({
  _id: z.string(),
})

const USER_HEADER = z.object({
  authorization: z.string(),
})

const USER = z.object({
  _id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  finishedSignup: z.boolean(),
})

export type TUserPostBody = z.infer<typeof USER_POST_BODY>
export type TUserPostBodyLogin = z.infer<typeof USER_POST_BODY_LOGIN>
export type TUserLoginResponse = z.infer<typeof USER_LOGIN_RESPONSE>
export type TUserId = z.infer<typeof USER_ID>
export type TUserHeader = z.infer<typeof USER_HEADER>
export type TUser = z.infer<typeof USER>

export { USER_POST_BODY, USER, USER_POST_BODY_LOGIN, USER_LOGIN_RESPONSE, USER_ID, USER_HEADER }
