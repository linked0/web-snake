import { Request, Response, Router, NextFunction } from 'express';
import Article from '../../models/article';
import { User } from '../../models/user';
import { uploadImages } from '../../common';
import fs from 'fs';
import path from 'path';  

const router = Router();

router.post('/api/article/new', uploadImages, async (req:Request, res: Response, next: NextFunction ) => {
  const { title, content } = req.body;

  if(!req.files) {
    const error = new Error('Image is required') as CustomError;
    error.status = 400;
    return next(error);
  }

  let images: Array<Express.Multer.File> = [];
  if(typeof req.files === 'object') {
    images = Object.values(req.files);

  } else {
    images = req.files ? [...req.files] : [];
  }

  if (!title || !content) {
    const error = new Error('Title and content are required') as CustomError;
    error.status = 400;
    return next(error);
  }

  const newArticle = Article.build({
    title,
    content,
    images:  images.map((file: Express.Multer.File) => {
      let srcObj = { src: `data:${file.mimetype};base64,${fs.readFileSync(path.join('upload' + file.filename)).toString('base64')}` };
      fs.unlink(path.join('upload/', file.filename), (err) => {})
      return srcObj;
    })
  });

  await newArticle.save();

  await User.findOneAndUpdate( { _id: req.currentUser!.userId }, { $push: { articles: newArticle._id } });

  res.status(201).send(newArticle);
});

router.post('/update/:id', async (req:Request, res: Response, next: NextFunction ) => {
  const { id } = req.params;
  const { title, content } = req.body;

  console.log('id :', id);

  if(!id) {
    const error = new Error('Article ID is required') as CustomError;
    error.status = 400;
    return next(error);
  }

  let updatedArticle;
  try {
    updatedArticle = await Article.findOneAndUpdate(
      { _id: id },
      { $set: { title, content } },
      { new: true }
    )
  } catch (error) {
    const err = new Error(`Error while updating Article ${error}`) as CustomError;
    err.status = 400;
    return next(err);
  }

  res.status(200).send(updatedArticle);
});

router.delete('/delete/:id', async (req:Request, res: Response, next: NextFunction ) => {
  const { id } = req.params;

  console.log('id :', id);  

  if(!id) {
    const error = new Error('Article ID is required') as CustomError;
    error.status = 400;
    return next(error);
  }

  try {
    await Article.findOneAndDelete({ _id: id });
  } catch (error) {
    next( new Error(`Error while deleting Article ${error}`) );

  }

  res.status(200).json( { success : true } );
});

router.get('/show/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if(!id) {
      const allPosts = await Article.find();
      return res.status(200).send(allPosts)
  }

  const article = await Article.findOne({ _id: id });

  res.status(200).json(article);
})


export { router as NewArticleRoute };