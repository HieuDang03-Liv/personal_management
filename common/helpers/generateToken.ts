import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface SigningUser {
  email: string
}

export const generateAccessToken = (user: SigningUser) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

export const generateRefreshToken = (user: SigningUser) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!)
}
