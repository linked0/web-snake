import { Router, Request, Response, NextFunction } from 'express'
import { User } from '../../models/user'
import jwt from 'jsonwebtoken'
import { BadRequestError, validationRequest } from '../../../common'
import { body } from 'express-validator'

const router = Router()

router.post('/signup', [
    body('email')
    .not().isEmpty()
    .isEmail()
    .withMessage('a valid email is required'),

    body('password')
    .not().isEmpty()
    .isLength({ min: 6 })
    .withMessage('a valid password is required')

], validationRequest , async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user) return next(new BadRequestError('user with the same email already exist'))

    const newUser = User.build({
        email,
        password,
    })

    await newUser.save()

    req.session = { 
        jwt: jwt.sign({ email, userId: newUser._id }, process.env.JWT_KEY!)
     }

    res.status(201).send(newUser)
})

export { router as signupRouter }