import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { Router } from "express"
const loginRouter = Router()
import User from "../models/user.js"

loginRouter.post('/', async (req, res) => {
    const body = req.body

    const user = await User.findOne({ username: body.username })
    const pwdCorrect = user === null ? false : await bcrypt.compare(body.password, user.pwdHash)

    if (!(user && pwdCorrect)) {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    //token expiration achieved by expiresIn 60x60 seconds = 1hr
    //after, user needs to get a new token (i.e. force relogin)
    //another way would be a server side session; cookies
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    res.status(200).send({ token, username: user.username, name: user.name })
})

export default loginRouter