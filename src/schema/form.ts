import { z } from 'zod'

const FORM_ELEMENT = z.object({
  _id: z.string(),
  question: z.string(),
  response: z.array(z.string()),
})

const FORM = z.array(FORM_ELEMENT)

export type TFormElement = z.infer<typeof FORM_ELEMENT>
export type TForm = z.infer<typeof FORM>

export { FORM_ELEMENT, FORM }
