import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new Error(errors.array().map( err => err.msg).join(',')));
    }

    next();
}