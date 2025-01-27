import { Request, Response } from 'express';
import Router from 'express-promise-router';
import Product from '../models/product';

const router = Router();

router.get('/genApiKey', async (req: Request, res: Response) => {
  res.send('admin/genApiKey');
});

router.post('/add-product', async (req: Request, res: Response) => {
  const product = new Product(req.body.name, req.body.price);
  product.save();
  res.status(200).json({ message: `Product added successfully ${req.body.name} and ${req.body.price}` });
});

router.get('/error', async (req: Request, res: Response) => {
  const product = new Product('', 0);
  try {
    console.log('req.body.request :', req.body.request);
    const data = await product.error(req.body.request);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/delete-product:id', Product.deleteProduct);

router.get('/products', async (_req: Request, res: Response) => {
  const data = Product.findAll();
  res.status(200).json({ data });
});
export const AdminRoute = router;
