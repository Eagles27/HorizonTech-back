import { Schema, model } from 'mongoose'
import { TUserPostBody } from './user'
import { TForm } from './form'
import { TFormAnswerElement, TFormAnswers } from './form_answer'

// User schema
const userSchema = new Schema<TUserPostBody>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  finishedSignup: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
  },
})

// User model
const USER_MONGOOSE = model<TUserPostBody>('User', userSchema)
export { USER_MONGOOSE }

// Form schema
const formSchema = new Schema<TForm>([
  {
    _id: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    response: {
      type: [{ type: String }],
      required: true,
    },
  },
])

// Form model
const FORM_MONGOOSE = model<TForm>('Form', formSchema)
export { FORM_MONGOOSE }

// Form Answer schema
const formAnswerSchema = new Schema<TFormAnswerElement>({
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
})

const formPostSchema = new Schema<TFormAnswers>({
  user_id: {
    type: String,
    required: true,
  },
  responses: [formAnswerSchema],
})

// Form Answer model
const FORM_ANSWER_MONGOOSE = model<TFormAnswers>('FormAnswer', formPostSchema)
export { FORM_ANSWER_MONGOOSE }
