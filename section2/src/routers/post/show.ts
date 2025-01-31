import { Router, Response, Request, NextFunction } from 'express'
import Post from '../../models/post'
const router = Router()

router.post('/api/post/show/', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if(!id) {
        const allPosts = await Post.find();
        return res.status(200).send(allPosts)
    }

    const post = await Post.findOne({ _id: id }).populate('comments')

    res.status(200).send(post)
})

export { router as showPostRouter }