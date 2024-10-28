// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { AuthenticatedRequest, IUser } from '../utils/interface.util';

// const protect = (req: Request, res: Response, next: NextFunction): Response | void => {
//     const header = req.headers['authorization'];

//     if (!header) {
//         return res.status(401).json({ message: 'Authorization header missing' });
//     }

//     const token: string = header.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized, access denied' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET as string, (err, data) => {
//         if (err) {
//             return res.status(403).json({ error: true, message: 'Invalid token' });
//         }

//         if (typeof data === 'object' && data !== null) {
//             req.user = data as IUser;  
//             next();
//         } else {
//             return res.status(403).json({ error: true, message: 'Invalid token structure' });
//         }
//     });
// };

// export default protect;
