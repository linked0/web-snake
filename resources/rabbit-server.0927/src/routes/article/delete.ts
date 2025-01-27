import { Router, Request, Response, NextFunction } from 'express';
import  Article from '../../models/article';
import { User, UserDoc } from '../../models/user';

const router = Router();

router.post('/api/article/delete/:id', async (req: Request, res: Response, next: NextFunction) => {

    const  { id } = req.params;
    if(!id) {
        const error = new Error('Article ID is required') as CustomError;
        error.status = 400;
        return next(error);
    }

    try {
        await Article.findOneAndDelete({ _id: id });    
    } catch (error) {
        const err = new Error(`Error while deleting Article ${error}`) as CustomError;
        err.status = 400;
        return next(err);
    }

    const user = await User.findOneAndUpdate({ _id: req.currentUser!.userId }, { $pull: { articles: id } }, { new: true }) as UserDoc;
    if(!user) {
        const error = new Error('User not found') as CustomError;
        error.status = 404;
        return next(error);
    }

    res.status(200).json({ success: true });
});
