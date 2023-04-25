import { Order } from "@models/order";

export interface IOrdersRepository {
  createOrder(carrierId: string): Promise<Order>;
}