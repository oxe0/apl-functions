import { Order } from '@models/order';

export type IOrdersRepository = {
  createOrder(carrierId: string): Promise<Order>;
};
