import userModel from './user.model'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { ERROR_MESSAGE } from '../../common/constants'
import { UserInterface } from './user.entity'
import { generateAccessToken, generateRefreshToken } from '../../common/helpers'
import { CustomRequest } from '../../common/types'

let refreshTokens: Array<string> = []

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, dateOfBirth, gender, job, isMarried } = req.body
    if ((await userModel.find({ email })).length) {
      return res.status(400).json({ message: ERROR_MESSAGE.USER_EXISTED })
    }
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
      const accessToken = generateAccessToken({ email: user.email })
      const refreshToken = generateRefreshToken({ email: user.email })
      refreshTokens.push(refreshToken)
      user.refreshToken = refreshToken
      res.status(200).json({ message: `Successfully loged in.`, accessToken, refreshToken })
    } else {
      res.status(401).json({ message: ERROR_MESSAGE.INCORRECT_PASSWORD })
    }
  } catch (err) {
    res.status(400).json({ message: ERROR_MESSAGE.COMMON_ERR })
  }
}

export const editUser = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req.params
    const info = req.body
    const user = await userModel.findById({ userId })
    await user?.update(info)
    await user?.save()
    res.status(200).json({
      message: `User ${user?.email} updated`,
    })
  } catch (err) {
    res.status(400).json({ message: ERROR_MESSAGE.COMMON_ERR })
  }
}

export const deleteTokens = (req: Request, res: Response) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
}
