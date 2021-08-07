import { Router } from 'express'
const router = Router()
import Note from '../models/note.js'

router.get('/', (req, res) => {
    Note.find({}).then(notes => res.json(notes))
})

router.get('/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            note ? res.json(note) : res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', (req, res, next) => {
    const body = req.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note.save()
        .then(savedNote => res.json(savedNote))
        .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
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

export default router