import {} from 'dotenv/config'
// ^^^ import dotenv from 'dotenv'; dotenv.config() doesn't work to full extent f5r. https://github.com/motdotla/dotenv/issues/89
import express, { response } from 'express'
import cors from 'cors'
import Note from './models/note.js'

const app = express()

//middleware request logger
const reqLogger = (req, res, next) => {
    console.log('-----------------------')
    console.log('req.method :>> ', req.method)
    console.log('req.path :>> ', req.path)
    console.log('req.body :>> ', req.body)
    console.log('-----------------------')
    next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(reqLogger)

app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD!</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => res.json(notes))
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            note ? res.json(note) : res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
})

app.delete('/api/notes/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => {
            next(err)
        })
})

app.post('/api/notes', (req, res, next) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note.save()
        .then(savedNote => savedNote.toJSON())
        .then(savedAndFormattedNote => res.json(savedAndFormattedNote))
        .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(err => {
            next(err)
        })
})

//unknown endpoint middleware
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//err handler middleware(this is where all the errs passed to next go) has 2b loaded last
const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'wrong/malformed id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)

console.log(`server running on ${PORT}`);