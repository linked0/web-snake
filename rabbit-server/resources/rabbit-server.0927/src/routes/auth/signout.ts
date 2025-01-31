import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.post('/signout', async (req: Request, res: Response, next: NextFunction) => {
    req.session = null
    res.send({})
})

export { router as signoutRouter };