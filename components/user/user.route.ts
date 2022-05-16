import { registerUser, logInUser } from './user.controller'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', logInUser)

export default userRouter
