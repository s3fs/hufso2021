import { Router } from 'express'
const router = Router()
import Note from '../models/note.js'

router.get('/', async (req, res) => {
    res.json(await Note.find({}))
})

router.get('/:id', async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)
        note ? res.json(note) : res.status(404).end()
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Note.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const body = req.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    try {
        res.json(await note.save())
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
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