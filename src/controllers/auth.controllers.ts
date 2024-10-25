import express, {Request, Response} from 'express'
import User from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { IUser } from '../utils/type.util'

export const register = async (req:Request, res:Response)=>{
         try {
             const {username, password, email} = req.body
         const salt = await bcrypt.genSalt(10)
         const hashedPasword = await bcrypt.hash(password, salt)
    
         const user= new User({
             username, email, password: hashedPasword
         })
    
         if(!user) {
             return res.status(400).json({error: true, message: 'Invalid user data'})
         }
    
         await user.save()
    
         res.status(201).json({error: false, data: user})
         } catch (error:any) {
             return res.status(500).json({error: true, message: 'Internal server error: '+ error.message})
         }
    
     }

  export const login = async (req: Request, res: Response)=>{
    try {
        const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({error: true, message: 'Please provide both email and password to login'})
    }

    const user: IUser | null = await User.findOne({email})

    if(!user) {
        return res.status(400).json({error: true, message: 'Invalid email or password'})
    }

    const passwordMached = await bcrypt.compare(password, user.password)

    if(!passwordMached) {
        return res.status(400).json({error: true, message: 'Invalid email or password'})
    }

    const token = jwt.sign({id: user._id, username: user.username, email:user.email}, process.env.JWT_SECRET as string, {expiresIn:process.env.JWT_EXPIRES_IN})

    res.status(200).json({error: false, data: token})
    } catch (error:any) {
        return res.status(500).json({error: true, message: 'Internal server error: '+ error.message})

    }

}