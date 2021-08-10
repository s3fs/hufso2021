import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/user.js'
const userRouter = Router()

userRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10
    const pwdHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        pwdHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

export default userRouter