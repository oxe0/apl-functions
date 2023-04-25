import { Order } from "@models/order";
import { IOrdersRepository } from "@repositories/types";

export type CreateOrderForCarrierParams = {
  carrierId: string;
}

export default class CreateOrderForCarrierUseCase {
  constructor(private readonly orderRepository: IOrdersRepository) { }

  async exec(params: CreateOrderForCarrierParams): Promise<Order> {
    return this.orderRepository.createOrder(params.carrierId);
  }
}
