import { Request, Response, Router, NextFunction } from "express";
import Article from "../../model/article";
import Comment from "../../model/comment";
import { BadRequestError } from "../../../common";

const router = Router();

router.post(
  "/api/comment/new/:articleId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, content } = req.body;
    const { articleId } = req.params;

    if (!content) {
      return next(new BadRequestError("Content is required"));
    }

    const newComment = new Comment({
      userName: userName ? userName : "Anonymous",
      content,
    });

    await newComment.save();

    const updatedArticle = await Article.findOneAndUpdate(
      { _id: articleId },
      { $push: { comments: newComment._id } },
      { new: true }
    );

    res.status(201).send(updatedArticle);
  }
);

export { router as NewCommentRoute };
