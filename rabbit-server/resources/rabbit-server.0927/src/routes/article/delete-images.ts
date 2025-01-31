import { Router , Request, Response, NextFunction } from 'express';
import Article from '../../models/article';
const router = Router();

router.post('/article/:id/delete/images', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { imagesId} = req.body;
    const article = await Article.findOneAndUpdate({ _id: id }, { $pull: { images: { _id: { $in: imagesId } } } }, { new: true });

    res.status(200).send(article);
});

export { router as deleteImagesRouter };

