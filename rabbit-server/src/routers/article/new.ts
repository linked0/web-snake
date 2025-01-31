import { Request, Response, Router, NextFunction } from "express";
import Article from "../../model/article";
import { BadRequestError } from "../../../common";

const router = Router();

router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return next(new BadRequestError("Title and content are required"));
  }

  const newArticle = new Article({
    title,
    content,
  });

  await newArticle.save();

  res.status(201).send(newArticle);
});

router.post(
  "/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;

    console.log("id :", id);

    if (!id) {
      return next(new BadRequestError("Article ID is required"));
    }

    let updatedArticle;
    try {
      updatedArticle = await Article.findOneAndUpdate(
        { _id: id },
        { $set: { title, content } },
        { new: true }
      );
    } catch (error) {
      return next(new BadRequestError(`Error while updating Article ${error}`));
    }

    res.status(200).send(updatedArticle);
  }
);

router.delete(
  "/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    console.log("id :", id);

    if (!id) {
      return next(new BadRequestError("Article ID is required"));
    }

    try {
      await Article.findOneAndDelete({ _id: id });
    } catch (error) {
      next(new Error(`Error while deleting Article ${error}`));
    }

    res.status(200).json({ success: true });
  }
);

export { router as NewArticleRoute };
