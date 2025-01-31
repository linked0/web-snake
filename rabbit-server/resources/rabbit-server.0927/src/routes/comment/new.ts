import { Request, Response, Router, NextFunction } from 'express';
import Article from '../../models/article';
import Comment from '../../models/comment';

const router = Router();

router.post('/api/comment/new/:articleId', async (req:Request, res: Response, next: NextFunction ) => {
  const { userName, content } = req.body;
  const { articleId } = req.params;

  if(!content) {
    const error = new Error('Content is required') as CustomError;
    error.status = 400;
    return next(error);
  }

  const newComment = Comment.build({
    userName: userName ? userName : 'Anonymous',
    content,
  });

  await newComment.save();

  const updatedArticle = await Article.findOneAndUpdate(
    { _id: articleId },
    { $push: { comments: newComment._id } },
    { new: true }
  );

  res.status(201).send(updatedArticle);
});

export { router as NewCommentRoute };