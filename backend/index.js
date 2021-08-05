import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

//middleware request logger
const reqLogger = (req, res, next) => {
    console.log('req.method :>> ', req.method)
    console.log('req.path :>> ', req.path)
    console.log('req.body :>> ', req.body)
    console.log('-----------------------')
    next()
}
app.use(reqLogger)

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD!</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(n => n.id === id)
    
    note ? res.json(note) : res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: genId()
    }

    notes = [...notes, note]

    res.json(note)
})

//spread op to allow mathmax on an array
const genId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)

console.log(`server running on ${PORT}`);