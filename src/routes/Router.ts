import { Router as ExpreessRouter, Request, Response } from 'express';
import CartController from '../controller/CartController';
import PagSeguroController from '../controller/PagSeguroController';
import ProductController from '../controller/ProductController';
import UserController from '../controller/UserController';

// const router = ExpreessRouter();

export default class Router {

  router: ExpreessRouter;

  userController: UserController = new UserController();
  productController: ProductController = new ProductController();
  pagSeguroController: PagSeguroController = new PagSeguroController();
  cartController: CartController = new CartController();

  constructor() {
    this.router = ExpreessRouter();

    this.router.get("/", (req: Request, res: Response) => { res.send("Hello World!"); });

    this.router.post("/create-user", (req: Request, res: Response) => {
      return this.userController.createUser(req, res);
    })
  }


}
