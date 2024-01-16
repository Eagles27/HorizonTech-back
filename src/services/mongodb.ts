import envConfig from '@/configs/envConfig'
import mongoose from 'mongoose'

async function connectToDb() {
  try {
    await mongoose.connect(envConfig.MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
  }
}

export default connectToDb
