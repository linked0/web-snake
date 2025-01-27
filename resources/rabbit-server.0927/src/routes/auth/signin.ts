import { Router, Request, Response, NextFunction } from 'express';
import { User
 } from '../../models/user';
import { authenticationService } from '../../common'
import jwt from 'jsonwebtoken'

 const router = Router();
 router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return next(new Error('User not found'));
    }
    if(user.password !== password) {
        return next(new Error('Password is incorrect'));
    }

    const isEqual  = await authenticationService.pwdCompare(password, user.password);
    if(!isEqual) {
        return next(new Error('Password is incorrect'));
    }

    const token = jwt.sign({ email, userId: user._id }, process.env.JWT_KEY!, { expiresIn: '10h' });
    req.session = { jwt: token };

    res.status(200).send(user);
})
