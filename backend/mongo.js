import mongoose from 'mongoose'
const { connect, Schema, model, connection } = mongoose

if (process.argv.length < 3) {
    console.log('Provide pwd: node <filename> <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fsopen:${password}@cluster0.5psdm.mongodb.net/note-app?retryWrites=true&w=majority`

connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = model('Note', noteSchema)

Note.find({}).then(res => {
    res.forEach(note => console.log(note))
    connection.close()
})

/*const note = new Note({
    content: 'HTML is Bebe',
    date: new Date(),
    important: true,
})
  
note.save().then(result => {
    console.log('note saved!')
    console.log('result :>> ', result);
    connection.close()
})*/