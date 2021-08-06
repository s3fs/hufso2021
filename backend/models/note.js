import mongoose from 'mongoose'
const { connect, Schema, model, connection } = mongoose

const url = process.env.MONGODB_URI
console.log('process.env.MONGODB_URI :>> ', process.env.MONGODB_URI);
console.log(`connecting to ${url}`)

connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('connected to MDB'))
    .catch(err => console.log(`NO_CON ${err}`))

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default model('Note', noteSchema)