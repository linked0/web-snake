import { Request, Response, Router, NextFunction } from "express";
import Article from "../../model/article";
import { BadRequestError } from "../../../common";

const router = Router();

router.get(
  "/api/article/show/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new BadRequestError("Article ID is required"));
    }

    const article = await Article.findOne({ _id: id });

    if (!article) {
      return next(new BadRequestError("Article not found"));
    }

    res.status(200).send(article);
  }
);

export { router as ShowArticleRouter };
