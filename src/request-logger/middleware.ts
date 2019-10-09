import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

/*
    Nicely formats incoming HTTP requests
*/
export function initializeRequestLogger(req: Request, res: Response, next: NextFunction) {
    console.log(`${moment().format()}: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next()
}

