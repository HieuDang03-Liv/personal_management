import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const serverPort = process.env.SERVER_PORT || 5000
app.listen(serverPort, () => {
  console.log('Server ON...')
})
