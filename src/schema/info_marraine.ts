import { z } from 'zod'

const MARRAINE_ELEMENT = z.object({
  _id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
  finishedSignup: z.boolean(),
  role: z.enum(['Etudiante', 'Marraine']),
})
const MARRAINE_INFO = z.array(MARRAINE_ELEMENT)

export type TMarraineElement = z.infer<typeof MARRAINE_ELEMENT>
export type TMarraineInfo = z.infer<typeof MARRAINE_INFO>

export { MARRAINE_ELEMENT, MARRAINE_INFO }
