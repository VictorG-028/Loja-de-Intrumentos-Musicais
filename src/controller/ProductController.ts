import { Product } from '@prisma/client';
import { Request, Response } from 'express';
import Controller from "../interfaces/Controller";
import SharedState from '../interfaces/SharedState';
import { validateCreateProductDto } from '../dto/product/CreateProductDto';
import { validateUpdateProductDto } from '../dto/product/UpdateProductDto';
import ProductRepository from '../repository/ProductRepository';



export default class ProductController implements Controller {

  productRepository: ProductRepository = ProductRepository.getInstance();

  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<Product | null> {
    if (req.path === '/create-product' && req.method === 'POST') {
      return await this.create(req, res, sharedState);
    } else if (req.path === '/update-product' && req.method === 'POST') {
      return await this.update(req, res, sharedState);
    }

    res.status(404).json({ message: 'Rota não encontrada' });
    return null;
  }

  public async create(req: Request, res: Response, sharedState: SharedState): Promise<Product | null> {
    const { name, price, quantity } = req.body;

    const isValid = validateCreateProductDto(req.body);

    if (!isValid) {
      res.status(400).json({ message: 'Produto inválido' });
      return null;
    }

    const createdProduct = await this.productRepository.create(name, price, quantity);

    res.status(200).json({ message: 'Produto criado com sucesso.', ...createdProduct });

    return createdProduct;
  }

  public async update(req: Request, res: Response, sharedState: SharedState): Promise<Product | null> {
    const { id, newProduct } = req.body;

    const isValid = validateUpdateProductDto(req.body);

    if (!isValid) {
      res.status(400).json({ message: 'Produto inválido' });
      return null;
    }

    const found = await this.productRepository.getById(id);

    if (!found) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return null;
    }

    const updatedProduct: Product = {
      ...found,
      ...newProduct
    };
    this.productRepository.update(updatedProduct);

    res.status(200).json({ message: 'Produto criado com sucesso.', ...updatedProduct });

    return updatedProduct;
  }
}


