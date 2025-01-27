import { Request, Response, Router, NextFunction } from 'express';
import Article from '../../models/article';
import Comment from '../../models/comment';
import { ExplainVerbosity } from 'mongodb';

const router = Router();

router.delete('/api/comment/:commentId/delete/:articleId', async (req:Request, res: Response, next: NextFunction ) => {
  const { articleId, commentId } = req.params;

  if(!commentId || !articleId) {
    const error = new Error('Article ID and Comment ID are required') as CustomError;
    error.status = 400;
    return next(error);
  }

  try {
    await Comment.findOneAndDelete({ _id: commentId });
  } catch (error) {
    next(new Error(`Error while deleting comment ${error}`));
  }

  const article = await Article.findOneAndUpdate({ _id: articleId }, { $pull: { comments: commentId } }, { new: true });

  if(!article) {  
    const error = new Error('Article not found') as CustomError;
    error.status = 404;
    return next(error);
  }

  res.status(200).json({ success: true });
});

export { router as DeleteCommentRoute };