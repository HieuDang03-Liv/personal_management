import userModel from './user.model'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { ERROR_MESSAGE } from '../../common/constants'
import { UserInterface } from './user.entity'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, dateOfBirth, gender, job, isMarried } =
      req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      name,
      dateOfBirth,
      gender,
      job,
      isMarried,
    })
    res.status(201).json({ message: `Created ${newUser.email} account!` })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user: UserInterface | null = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: ERROR_MESSAGE.NO_USERNAME })
    }
    const hashedPassword = user.password
    const matchedPassword = await bcrypt.compare(password, hashedPassword)
    if (matchedPassword) {
      res.status(200).json({ message: `Successfully loged in.` })
    } else {
      res.status(401).json({ message: ERROR_MESSAGE.INCORRECT_PASSWORD })
    }
  } catch (err) {
    res.status(400).json({ message: ERROR_MESSAGE.COMMON_ERR })
  }
}
