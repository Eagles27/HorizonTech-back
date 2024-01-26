import { z } from 'zod'

const FORM_ANSWER_ELEMENT = z.object({
  question: z.string(),
  response: z.string(),
})
const MARRAINE_ELEMENT = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  finishedSignup: z.boolean(),
  role: z.enum(['Etudiante', 'Marraine']),
  responses: z.array(FORM_ANSWER_ELEMENT),
})
const MARRAINE_INFO = z.array(MARRAINE_ELEMENT)

export type TMarraineElement = z.infer<typeof MARRAINE_ELEMENT>
export type TMarraineInfo = z.infer<typeof MARRAINE_INFO>

export { MARRAINE_ELEMENT, MARRAINE_INFO }
