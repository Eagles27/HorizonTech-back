import envConfig from '@/configs/envConfig'
import { MongoClient, ServerApiVersion } from 'mongodb'

const client = new MongoClient(envConfig.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

const connect = async () => {
  await client.connect()
  console.log('Connected successfully to MongoDB')
}

export default connect
