import { z } from 'zod'

const FORM_ANSWER = z.object({
  question: z.string(),
  response: z.string(),
})

const FORM_POST_BODY = z.object({
  user_id: z.string(),
  responses: z.array(FORM_ANSWER),
})

const FORM_RESPONSE = z.object({
  formtoken: z.string(),
})

export type TFormAnswer = z.infer<typeof FORM_ANSWER>
export type TFormPost = z.infer<typeof FORM_POST_BODY>
export type TFormResponse = z.infer<typeof FORM_RESPONSE>

export { FORM_POST_BODY, FORM_ANSWER, FORM_RESPONSE }
