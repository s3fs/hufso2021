import Note from "../models/note"

const initNotes = [
    {
        content: 'HTML is easy',
        date: new Date(),
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true,
    }
]

const nonExId = async () => {
    const note = new Note({
        content: 'willremovethissoon',
        date: new Date()
    })

    await note.save()
    await note.remove()

    return note._id.toString()
}

const notesDb = async () => {
    const notes = await Note.find({})
    return notes.map(n => n.toJSON())
}

export { initNotes, nonExId, notesDb }