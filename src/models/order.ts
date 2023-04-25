import { randomUUID } from 'crypto';
import { DynamoDBItem } from '@libs/dynamo';

export enum OrderStatus {
  CREATED = 'CREATED',
  PARCEL_DELIVERED = 'PARCEL_DELIVERED',
  CONSUMER_PICKED_UP = 'CONSUMER_PICKED_UP',
  TECHNICAL_FAILURE = 'TECHNICAL_FAILURE',
}

export class Order extends DynamoDBItem {
  readonly carrierId: string;
  readonly orderId: string;
  readonly createdAt: Date;
  readonly status: OrderStatus;

  constructor(
    carrierId: string,
    orderId?: string,
    createdAt?: Date,
    status?: OrderStatus,
  ) {
    super();
    this.carrierId = carrierId;
    this.orderId = orderId ?? randomUUID();
    this.createdAt = createdAt ?? new Date();
    this.status = status ?? OrderStatus.CREATED;
  }

  toItem(): Record<string, unknown> {
    return {
      ...this.keys(),
      carrierId: { S: this.carrierId },
      orderId: { S: this.orderId },
      status: { S: this.status },
      createdAt: { S: this.createdAt.toISOString() },
    };
  }

  get pk(): string {
    return `CARRIER#${this.carrierId}`;
  }

  get sk(): string {
    return `ORDER#${this.orderId.toString()}`;
  }
}
