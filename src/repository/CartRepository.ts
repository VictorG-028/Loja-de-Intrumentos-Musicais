import { Cart, Product } from '@prisma/client';
import { v4 as uuidV4 } from "uuid";
import Database from '../Database';

export default class CartRepository {
  private static instance: CartRepository; // singleton
  private database: Database;

  private constructor() {
    this.database = Database.getInstance();
  }

  public static getInstance(): CartRepository {
    if (!CartRepository.instance) {
      CartRepository.instance = new CartRepository();
    }

    return CartRepository.instance;
  }

  public async addProducts(cartId: string, userId: string, products: Product[]): Promise<Cart> {
    return this.database.prisma.cart.upsert({
      where: { id: cartId }, // Condição para encontrar o carrinho (ou criar um novo)
      update: {
        products: {
          connect: products.map(product => ({ id: product.id })), // Conecta os produtos ao carrinho
        },
      },
      create: {
        id: cartId, // Se o carrinho não existir, cria um novo com o ID fornecido
        userId: userId, // Associa o carrinho ao usuário
        products: {
          connect: products.map(product => ({ id: product.id })), // Conecta os produtos ao carrinho
        },
      },
      include: { products: true } // Inclui os produtos no retorno para verificar o resultado
    });
  }

}


