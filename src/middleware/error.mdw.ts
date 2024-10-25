import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        errors: err.errors ? err.errors : [], 
        data: err.data ? err.data : {}, 
        status: err.statusCode ? err.statusCode : 500
    });
};

export default errorHandler;
