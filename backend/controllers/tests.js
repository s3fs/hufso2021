import { Router } from 'express'
const testRouter = Router()
import Note from '../models/note.js'
import User from '../models/user.js'

//the test DB needs to have the same state for every test
//allow e2e tests to have access to the test DB
//through the {app.js declared endpoint}/reset
testRouter.post('/reset', async (req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

export default testRouter
