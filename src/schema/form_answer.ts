import { z } from 'zod'

const FORM_ANSWER_ELEMENT = z.object({
  question: z.string(),
  response: z.string(),
})

const FORM_ANSWER_ELEMENT_WITH_ID = z.object({
  _id: z.string(),
  question: z.string(),
  response: z.string(),
})

const FORM_POST_BODY = z.object({
  responses: z.array(FORM_ANSWER_ELEMENT),
})

const FORM_RESPONSE = z.object({
  _id: z.string(),
})

const FORM_ANSWERS = z.object({
  _id: z.string(),
  user_id: z.string(),
  responses: z.array(FORM_ANSWER_ELEMENT_WITH_ID),
})

export type TFormAnswersElementwithID = z.infer<typeof FORM_ANSWER_ELEMENT_WITH_ID>
export type TFormAnswers = z.infer<typeof FORM_ANSWERS>
export type TFormAnswerElement = z.infer<typeof FORM_ANSWER_ELEMENT>
export type TFormPost = z.infer<typeof FORM_POST_BODY>
export type TFormResponse = z.infer<typeof FORM_RESPONSE>

export { FORM_POST_BODY, FORM_ANSWER_ELEMENT, FORM_RESPONSE, FORM_ANSWERS, FORM_ANSWER_ELEMENT_WITH_ID }
