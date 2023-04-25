import { Order } from '@models/order';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { IOrdersRepository } from './types';

const ORDERS_TABLE = 'APLTable';

export default class OrdersRepository implements IOrdersRepository {
  constructor(private readonly dbClient: DynamoDB) {}

  async createOrder(carrierId: string): Promise<Order> {
    const order = new Order(carrierId);

    await this.dbClient
      .putItem({
        TableName: ORDERS_TABLE,
        Item: order.toItem(),
        ConditionExpression: 'attribute_not_exists(PK)',
      })
      .promise();

    return order;
  }
}
