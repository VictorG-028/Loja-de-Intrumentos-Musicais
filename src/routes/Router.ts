import { Router as ExpreessRouter, Request, Response } from 'express';
import CartController from '../controller/CartController';
import PagSeguroController from '../controller/PagSeguroController';
import ProductController from '../controller/ProductController';
import SharedState from '../interfaces/SharedState';
import CachePayments from '../decorators/CachePayments';


export default class Router {

  router: ExpreessRouter;
  sharedState: SharedState = {};

  productController = new ProductController();
  pagSeguroController = new CachePayments(new PagSeguroController());
  cartController = new CartController();

  constructor() {
    this.router = ExpreessRouter();

    // bind(this) é usado para manter o contexto da classe Router dentro do método post
    this.router.post("/create-product", this.createProduct.bind(this));
    this.router.post("/update-product", this.editProduct.bind(this));
    this.router.post("/start-payment", this.startPayment.bind(this));
    this.router.post("/add-products-to-cart", this.addProductsToCart.bind(this));

    // API do mercado pago enviar um post nessa rota
    this.router.post("/notify", this.endPayment.bind(this));
  }

  private async createProduct(req: Request, res: Response): Promise<void> {
    this.productController.execute(req, res, this.sharedState);
    return undefined;
  }

  private async editProduct(req: Request, res: Response): Promise<void> {
    this.productController.execute(req, res, this.sharedState);
    return undefined;
  }

  private async startPayment(req: Request, res: Response): Promise<void> {
    this.pagSeguroController.execute(req, res, this.sharedState);
    return undefined;
  }

  private async endPayment(req: Request, res: Response): Promise<void> {
    this.pagSeguroController.execute(req, res, this.sharedState);
    return undefined;
  }

  private async addProductsToCart(req: Request, res: Response): Promise<void> {
    this.cartController.execute(req, res, this.sharedState);
    return undefined;
  }
}
