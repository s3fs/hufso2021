import { Router } from 'express'
const router = Router()
import Note from '../models/note.js'
import User from '../models/user.js'

router.get('/', async (req, res) => {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    res.json(notes)
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

    const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id
    })

    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.json(savedNote)
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