import { MONGODB_URI } from './utils/config.js'
import express from 'express' /* figure out this imnport */
const app = express()
import 'express-async-errors'
import cors from 'cors'
import router from './controllers/notes.js'
import userRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testRouter from './controllers/tests.js'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'
import { info, error } from './utils/logger.js'
import mongoose from 'mongoose'
const { connect } = mongoose

info('connecting to', MONGODB_URI)

connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((err) => {
    error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', router)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

//create the endpoint for dropping test DB contents
if(process.env.NODE_ENV  === 'test') {
  app.use('/api/testing', testRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

export default app