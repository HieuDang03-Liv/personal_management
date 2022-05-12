import express, { Express, Response, Request } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mongoDbURL = process.env.MONGODB_CONNECT_URL
mongoose.connect(mongoDbURL!, () => {
  console.log('Connected to DB...')
})

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Simple Webview')
})

export default app
