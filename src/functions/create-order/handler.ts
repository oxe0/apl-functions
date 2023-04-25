import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import createDynamoDBClient from '@models/index';
import OrdersRepository from '@repositories/order-repository';
import CreateOrderForCarrierUseCase from '@use-cases/create-order-for-carrier';

const handleCreateOrder = async (event) => {
  const dynamoClient = createDynamoDBClient();
  const orderRepository = new OrdersRepository(dynamoClient);
  const useCase = new CreateOrderForCarrierUseCase(orderRepository);

  const { carrierId } = event.body;
  const order = await useCase.exec({
    carrierId,
  });

  return formatJSONResponse({
    order,
  });
};

export const main = middyfy(handleCreateOrder);
