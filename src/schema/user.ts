import { z } from 'zod'

const USER_POST_BODY = z.object({
  name: z.string().min(3),
  email: z.string().email(),
})

const USER = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
})

export type TUserPostBody = z.infer<typeof USER_POST_BODY>
export type TUser = z.infer<typeof USER>

export { USER_POST_BODY, USER }
