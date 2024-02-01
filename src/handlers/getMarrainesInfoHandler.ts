import { FastifyReply, FastifyRequest } from 'fastify'
import requireAuth from '@/middleware/requireAuth'
import { FORM_ANSWER_MONGOOSE, USER_MONGOOSE } from '@/schema/mongoose'
import { TUser } from '@/schema/user'
import { TFormAnswers } from '@/schema/form_answer'

type TRequest = FastifyRequest<{
  Headers: {
    authorization: string
  }
}>

const getMarraineHandler = async (req: TRequest, res: FastifyReply) => {
  const userId = await requireAuth(req, res)
  if (!userId) return

  try {
    const user = (await USER_MONGOOSE.findById(userId)) as TUser
    if (!user) throw new Error('User not found')

    const userFormResponse = (await FORM_ANSWER_MONGOOSE.findOne({ user_id: userId._id })) as TFormAnswers

    const contactIds = user.contacts?.map((contact) => contact.contact_id) || []

    const marraineResponse = await USER_MONGOOSE.find({
      role: 'Marraine',
      _id: { $nin: contactIds },
    }).select('_id firstname lastname email finishedSignup role')

    if (!marraineResponse) throw new Error('Marraines not found')

    const marraine: TUser[] = await Promise.all(
      marraineResponse.map(async (userResponse) => {
        const formAnswer = (await FORM_ANSWER_MONGOOSE.findOne({ user_id: userResponse._id })) as TFormAnswers
        return {
          _id: userResponse._id.toString(),
          firstname: userResponse.firstname,
          lastname: userResponse.lastname,
          email: userResponse.email,
          finishedSignup: userResponse.finishedSignup,
          role: userResponse.role,
          formAnswer: {
            _id: formAnswer._id.toString(),
            user_id: formAnswer.user_id.toString(),
            responses: formAnswer.responses.map((response) => ({
              _id: response._id.toString(),
              question: response.question,
              response: response.response,
            })),
          },
        }
      })
    )

    const userResponse = userFormResponse.responses.find(
      (response) =>
        response.question ===
        'Dans quel secteur travaillez-vous actuellement ou dans lequel vous aimeriez travailler à l’avenir ? ( 1 seule réponse possible )'
    )?.response

    console.log(userResponse)

    marraine.sort((a, b) => {
      const aResponse = a.formAnswer?.responses.find(
        (response) =>
          response.question ===
          'Dans quel secteur travaillez-vous actuellement ou dans lequel vous aimeriez travailler à l’avenir ? ( 1 seule réponse possible )'
      )
      const bResponse = b.formAnswer?.responses.find(
        (response) =>
          response.question ===
          'Dans quel secteur travaillez-vous actuellement ou dans lequel vous aimeriez travailler à l’avenir ? ( 1 seule réponse possible )'
      )

      if (aResponse?.response === userResponse && bResponse?.response !== userResponse) {
        return -1
      }
      if (bResponse?.response === userResponse && aResponse?.response !== userResponse) {
        return 1
      }
      return 0
    })

    res.send(marraine)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error.message === 'User not found') {
        res.notFound(error.message)
        return
      }
      if (error.message === 'Marraines not found') {
        res.notFound(error.message)
        return
      }
    }
    res.internalServerError()
  }
}

export default getMarraineHandler
