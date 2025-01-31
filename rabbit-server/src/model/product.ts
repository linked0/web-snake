import { Request, Response } from 'express';

export default class Product {
  constructor(
    public name: string,
    public price: number,
  ) {
    this.name = name;
    this.price = price;
  }

  async save() {
  }

  async error(request: number) {
    return new Promise((resolve, reject) => {
      if (request === 0) {
        reject('Error');
      } else {
        resolve('Success');
      }
    });
  }

  static async deleteProduct(req: Request, res: Response) {
    res.status(200).json({ message: `Product deleted successfully - id: ${req.params.id}` });
  }

  static findAll() {
    const data = '{ "name": "product1", "price": 100 }';
    return JSON.parse(data);
  }
}