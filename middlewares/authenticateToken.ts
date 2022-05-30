import dotenv from 'dotenv'
dotenv.config()
import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ERROR_MESSAGE } from '../common/constants'
import { CustomRequest } from '../common/types'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token == null) {
    return res.status(401).json({ message: ERROR_MESSAGE.COMMON_ERR })
  } else {
    jwt.verify(token, ACCESS_TOKEN_SECRET!, (err, user) => {
      if (err) {
        return res.status(403).json({ message: ERROR_MESSAGE.COMMON_ERR })
      }
      req.currentUser = user!
      next()
    })
  }
}

export default authenticateToken
