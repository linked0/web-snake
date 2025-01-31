import  express, { Request, Response, Router, NextFunction }  from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { AdminRoute } from './routes/admin';
import { NewArticleRoute } from './routes/article/new';
import { NewCommentRoute } from './routes/comment/new';
import { DeleteCommentRoute } from './routes/comment/delete';
import { addImagesRouter, deleteImagesRouter  } from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession = require('cookie-session');
import { requireAuth, currentUser } from './common';

//For env File 
dotenv.config();

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

export default class Application {
  public expressApp!: express.Application;

  public connect = async (): Promise<void> => {
    if(!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    if(!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined');
    }

    try { 
      mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
      console.log('Error while connecting to MongoDB  :', error);
      throw new Error('Error while connecting to MongoDB');
    }
  }

  public async init() {
    const port = process.env.PORT || 8000;

    this.expressApp = express();
    
    this.expressApp.use(cors(
      {
        origin: "*",
        optionsSuccessStatus: 200
      }
    ))
    this.expressApp.set('trust proxy', true);

    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(cookieSession({
      signed: false,
      secure: false,
    }));

    this.expressApp.use(currentUser);

    this.expressApp.get('/', (_req, res) => res.send('Hello, World!'));

    this.expressApp.use("/admin", AdminRoute);
    this.expressApp.use(requireAuth, NewArticleRoute);
    this.expressApp.use(requireAuth, addImagesRouter);
    this.expressApp.use(requireAuth, deleteImagesRouter);
    this.expressApp.use(requireAuth, NewCommentRoute);
    this.expressApp.use(requireAuth, DeleteCommentRoute);

    this.expressApp.all('*', (_req, res, next) => {
      const error = new Error('Route not found') as CustomError;
      error.status = 404;
      next(error);
    });

    this.expressApp.use((error: CustomError, req:Request, res: Response, next: NextFunction) => {
      if(error.status) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal Server Error' });
    });

    this.expressApp.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  }
}
