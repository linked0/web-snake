import { Router, Request, Response, NextFunction }  from 'express';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';   
import { validationRequest } from '../../common';

const router = Router();

router.post('/signup', [
    body('email')
    .not().isEmpty()
    .isEmail()
    .withMessage('a valid email is required'),
    
    body('passwrod')
    .not().isEmpty()
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long')
], validationRequest, async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    console.log('email :', email);

    const user = await User.findOne( { email });
    if (user) {
        return next(new Error('User already exists'));
    }

    const newUser = User.build({ email, password });
    await newUser.save();

    req.session = { jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!, { expiresIn: '10h'}) };

    res.status(201).send(newUser);
});

export { router  as signupRouter };