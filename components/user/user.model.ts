import mongoose, { Model, Schema } from 'mongoose'
import { UserInterface } from './user.entity'

const userSchema: Schema = new Schema<UserInterface>({
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
  },
  gender: String,
  job: String,
  isMarried: Boolean,
  refreshToken: String,
})

const userModel: Model<UserInterface> = mongoose.model('User', userSchema)
export default userModel
