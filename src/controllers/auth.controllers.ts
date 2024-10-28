import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../utils/interface.util';

const JWT_SECRET = process.env.JWT_SECRET


export const register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { username, password, email } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        if (!user) {
            return res.status(400).json({ error: true, message: 'Invalid user data' });
        }

        await user.save();
        res.status(201).json({ error: false, data: user });
    } catch (error: any) {
        next(error);
    }
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'Please provide both email and password to login' });
        }

        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: true, message: 'Invalid email or password' });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(400).json({ error: true, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });

        res.status(200).json({ error: false, token });
    } catch (error: any) {
        next(error);
    }
};


export const logout = (req: Request, res: Response) => {
    res.status(200).json({ error: false, message: 'Logout successful' });
};


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: true, message: 'Token is required' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = (decoded as { id: string }).id;
        next();
    } catch (error) {
        return res.status(401).json({ error: true, message: 'Invalid token' });
    }
};

export const profile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user: IUser | null = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        res.status(200).json({ error: false, data: { username: user.username, email: user.email } });
    } catch (error: any) {
        next(error);
    }
};
