import { Request, Response } from 'express';
import Controller from "../interfaces/Controller";
import ProcessPaymentStrategy from '../interfaces/pattern/Strategy';
import SharedState from '../interfaces/SharedState';
import { Payment } from '@prisma/client';


class HandleCreatenNewPayment implements ProcessPaymentStrategy {

  public handlePayment(o: Payment): void {
  }
}


class HandleRepeatedPayment implements ProcessPaymentStrategy {

  public handlePayment(o: Payment): void {
  }

}

class PaymentContext {
  private strategy: ProcessPaymentStrategy;

  constructor(paymentStatus: string) {
    if (paymentStatus === 'new') {
      this.strategy = new HandleCreatenNewPayment();
    } else if (paymentStatus === 'repeated') {
      this.strategy = new HandleRepeatedPayment();
    } else {
      throw new Error('Invalid payment status');
    }
  }

  public setStrategy(strategy: ProcessPaymentStrategy) {
    this.strategy = strategy;
  }
}

export default class PagSeguroController implements Controller {


  public async execute(req: Request, res: Response, sharedState: SharedState): Promise<Payment | null> {
    if (req.path === '/start-payment' && req.method === 'POST') {
      return await this.startPayment(req, res);
    } else if (req.path === '/notify' && req.method === 'POST') {
      return await this.notify(req, res);
    }
    res.status(404).json({ message: 'Rota não encontrada' });
    return null;
  }

  public async startPayment(req: Request, res: Response): Promise<Payment | null> {
    // const { userId, idempotentId, productIds, totalCost, status } = req.body as Payment;
    const newPayment = req.body as Payment;


    const context = new PaymentContext("new");

    res.status(200).json({ message: 'Compra iniciada' });
    return null;
  }

  public async notify(req: Request, res: Response): Promise<Payment | null> {
    return null;
  }
}
