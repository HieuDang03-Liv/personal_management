type Gender = 'male' | 'female'

export interface UserInterface {
  email: string
  password: string
  name: string
  dateOfBirth: Date
  gender?: Gender
  job?: string
  isMarried?: boolean
}
