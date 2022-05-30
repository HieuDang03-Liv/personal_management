import { registerUser, logInUser, deleteTokens, editUser } from './user.controller'
import authenticateToken from '../../middlewares/authenticateToken'
import { Router } from 'express'

export const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', logInUser)
userRouter.patch('/edit', [<any>authenticateToken], <any>editUser)
userRouter.delete('/logout', deleteTokens)
