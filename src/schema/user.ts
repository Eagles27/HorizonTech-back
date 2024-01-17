import { z } from 'zod'

const USER_POST_BODY = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
})

const USER_POST_BODY_LOGIN = z.object({
  email: z.string().email(),
  password: z.string(),
})

const USER_LOGIN_RESPONSE = z.object({
  token: z.string(),
})

const USER = z.object({
  _id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
})

export type TUserPostBody = z.infer<typeof USER_POST_BODY>
export type TUserPostBodyLogin = z.infer<typeof USER_POST_BODY_LOGIN>
export type TUserLoginResponse = z.infer<typeof USER_LOGIN_RESPONSE>
export type TUser = z.infer<typeof USER>

export { USER_POST_BODY, USER, USER_POST_BODY_LOGIN, USER_LOGIN_RESPONSE }
