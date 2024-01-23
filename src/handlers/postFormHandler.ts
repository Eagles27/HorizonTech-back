import { FORM_ANSWER_MONGOOSE, USER_MONGOOSE } from '@/schema/mongoose'
import { FORM_POST_BODY, TFormPost } from '@/schema/form_answer'
import { FastifyReply, FastifyRequest } from 'fastify'
import envConfig from '@/configs/envConfig'
import jwt from 'jsonwebtoken'

// ANCIEN CODE AU CAS OU

// from '@/schema/mongoose'
// import { FORM_POST_BODY } from '@/schema/form_answer'
// import { FastifyReply, FastifyRequest } from 'fastify'
// import envConfig from '@/configs/envConfig'
// import jwt from 'jsonwebtoken'

// const postFormHandler = async (req: FastifyRequest, res: FastifyReply) => {
//   try {
//     // Validation des données avec Zod
//     FORM_POST_BODY.parse(req.body)

//     // Ajouter le form en base de données
//     const form = await FORM_ANSWER_MONGOOSE.create(req.body)

//     // Générer un token
//     const token = jwt.sign({ _id: form._id }, envConfig.JWT_SECRET)

//     res.code(201).send({ token })
//   } catch (error) {
//     if (error instanceof Error) {
//       if (error.message === 'Form already exists') {
//         res.conflict(error.message)
//         return
//       }
//       res.badRequest(error.message)
//       return
//     }
//     res.internalServerError()
//   }
// }

// export default postFormHandler

const postFormHandler = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    // Validation des données avec Zod
    FORM_POST_BODY.parse(req.body)

    // A REVOIR
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader?.replace('Bearer ', '')
    const decodedToken: any = token ? jwt.verify(token, envConfig.JWT_SECRET) : null
    const userId = decodedToken._id

    // Verifier que le user existe
    const userExists = await USER_MONGOOSE.exists({ _id: userId })
    if (!userExists) {
      throw new Error('User not found')
    }

    // On recupere le userId de l'utilisateur et on l'ajoute a notre schema
    const formData = {
      user_id: userId,
      responses: (req.body as TFormPost).responses,
    }
    // Ajouter le form en base de données
    const form = await FORM_ANSWER_MONGOOSE.create(formData)
    // Générer un token
    const formtoken = jwt.sign({ _id: form._id }, envConfig.JWT_SECRET)

    res.code(201).send({ formtoken })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Response already submitted for this question ') {
        res.conflict(error.message)
        return
      }
      res.badRequest(error.message)
      return
    }
    res.internalServerError()
  }
}

export default postFormHandler
