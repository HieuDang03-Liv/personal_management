import express, { Express, Response, Request, json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongoDbURL = process.env.MONGODB_CONNECT_URL
mongoose.connect(mongoDbURL!, () => {
  console.log('Connected to DB...')
})
import userRouter from './components/user'

const app: Express = express()
app.use(json())
app.use('/user', userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Simple Webview')
})

export default app
