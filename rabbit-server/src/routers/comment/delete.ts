import { Request, Response, Router, NextFunction } from "express";
import Article from "../../model/article";
import Comment from "../../model/comment";
import { ExplainVerbosity } from "mongodb";
import { BadRequestError } from "../../../common";

const router = Router();

router.delete(
  "/api/comment/:commentId/delete/:articleId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { articleId, commentId } = req.params;

    if (!commentId || !articleId) {
      return next(
        new BadRequestError("Article ID and Comment ID are required")
      );
    }

    try {
      await Comment.findOneAndDelete({ _id: commentId });
    } catch (error) {
      next(new Error(`Error while deleting comment ${error}`));
    }

    await Article.findOneAndUpdate(
      { _id: articleId },
      { $pull: { comments: commentId } }
    );
    res.status(200).json({ success: true });
  }
);

export { router as DeleteCommentRoute };
