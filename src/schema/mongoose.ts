import { Schema, model } from 'mongoose'
import { TUserPostBody } from './user'

// User schema
const userSchema = new Schema<TUserPostBody>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

// User model
const USER_MONGOOSE = model<TUserPostBody>('User', userSchema)
export default USER_MONGOOSE
