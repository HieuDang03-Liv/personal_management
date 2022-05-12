import mongoose from 'mongoose'
import { UserInterface } from './user.entity'

const userSchema = new mongoose.Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: String,
  job: String,
  isMarried: Boolean,
})

module.exports = mongoose.model('User', userSchema)
