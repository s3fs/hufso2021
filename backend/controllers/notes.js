import { Router } from 'express'
const router = Router()
import Note from '../models/note.js'

router.get('/', async (req, res) => {
    res.json(await Note.find({}))
})

router.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id)
    note ? res.json(note) : res.status(404).end()
})

router.delete('/:id', async (req, res) => {
    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

router.post('/', async (req, res) => {
    const body = req.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    res.json(await note.save())
})

router.put('/:id', async (req, res) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }

    const updNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
    res.json(updNote)
})

export default router