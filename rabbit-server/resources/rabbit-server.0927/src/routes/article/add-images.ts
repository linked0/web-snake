import { Router, Request, Response, NextFunction } from 'express';
import Article from '../../models/article';
import { uploadImages } from '../../common';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post('/article/:id/add/images', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
   
    if (!req.files) return next(new Error('No files uploaded'));

    let images: Array<Express.Multer.File>;

    if (typeof req.files === 'object') {
        images = Object.values(req.files);
    } else {
        images = req.files ? [...req.files] : [];
    }

    const imagesArray = images.map((file: Express.Multer.File) => {
        let srcObj = { src: `data:${file.mimetype};base64,${fs.readFileSync(path.join('upload' + file.filename)).toString('base64')}` };
        fs.unlink(path.join('upload/', file.filename), (err) => {})
        return srcObj;
    });

    const article = await Article.findOneAndUpdate({ _id: id }, { $push: { images: { $each: imagesArray } } }, { new: true });

    res.status(200).send(article);

});

export { router as addImagesRouter };