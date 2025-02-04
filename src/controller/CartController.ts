import { Request, Response } from 'express';
import Controller from "../interfaces/Controller";
import SharedState from '../interfaces/SharedState';


export default class CartController implements Controller {

  public execute(req: Request, res: Response, sharedState: SharedState): void {
    if (req.path === '/add-product' && req.method === 'POST') {
      this.addProductsToCart(req, res);
    }

    res.status(404).json({ message: 'Rota não encontrada' });
  }

  public async addProductsToCart(req: Request, res: Response): Promise<void> {
    const { name, price } = req.body;

    console.log("Product added!");
  }
}
