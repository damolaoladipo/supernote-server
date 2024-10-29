import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthenticatedRequest, IUser } from '../utils/interface.util';

const protect = (req: Request, res: Response, next: NextFunction): Response | void => {
    const header = req.headers['authorization'];

    let result =  {
        error: false,
        message: '',
        code: 200
    }

    if (!header) {
        result.message = 'Authorization header missing'
        result.code = 401
        result.error = true
    }

    const token: any = header.split(' ')[1];

    if (!token) {
        result.message = 'Unauthorized, access denied'
        result.code = 401
        result.error = true
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, data) => {
        if (err) {
            throw new Error('Invalid token')
        }

        if (typeof data === 'object' && data !== null) {
            req.user = data as IUser;  
            next();
        } else {
            result.message = 'Invalid token structure'
            result.code = 403
            result.error = true
        }
    });
    res.status(result.code).json(result)
};

export default protect;
