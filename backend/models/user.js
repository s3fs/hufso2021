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

userSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
        //pwdhash not 2b revealed ???? y doe
        delete retObj.pwdHash
    }
})

const User = model('User', userSchema)

export default User