import { Schema, model } from 'mongoose'
import { TUserPostBody } from './user'
import { TForm } from './form'

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
