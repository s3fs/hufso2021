import mongoose from 'mongoose'
const { Schema, model } = mongoose
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    pwdHash: String,
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

userSchema.plugin(uniqueValidator)

//This here below is a mechanism that runs when data is fetched in 
//json format. Actual data in mongodb contains __v, id and pwdhash
//more on tojson() https://thecodebarbarian.com/what-is-the-tojson-function-in-javascript.html
userSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
        delete retObj.pwdHash
    }
})

const User = model('User', userSchema)

export default User