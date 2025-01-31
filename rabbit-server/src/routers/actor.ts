import { Request, Response, Router, NextFunction} from 'express';
import Actor from '../entities/actor.entity';
import { DI } from '../application';

const router = Router();

router.post('/new', async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.body;
  if (!id || !name) {
    const error = new Error('ID and name are required') as CustomError;
    error.status = 400;
    return next
  }

  try {
    const actor = DI.em.create(Actor, { id: id, username: name });
    await DI.em.persistAndFlush(actor);

    res.status(201).send(actor);
  } catch (error) {
    const err = new Error(`Error while creating Actor ${error}`) as CustomError;
    err.status = 400;
    return next(err);
  }
});

router.get('/show/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id ) {
    const error = new Error('ID and name are required') as CustomError;
    error.status = 400;
    return next
  }

  const actorId = parseInt(id, 10);
  if (isNaN(actorId)) {
    const error = new Error('Invalid ID format') as CustomError;
    error.status = 400;
    return next(error);
  }

  // get actor by id
  const actor = await DI.actorRepository.findOne({ id: actorId });
  if (!actor) {
    const error = new Error('Actor not found') as CustomError;
    error.status = 404;
    return next(error);
  }

  // return actor
  res.status(200).send(actor);
});

export const ActorController = router;