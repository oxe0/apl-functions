import OrdersRepository from "@repositories/order-repository";
import CreateOrderForCarrierUseCase from "./create-order-for-carrier";
import { createMock } from "@golevelup/ts-jest";

describe("CreateOrderForCarrierUseCase", () => {
  let useCase: CreateOrderForCarrierUseCase;
  let mockedRepository: OrdersRepository;

  beforeEach(() => {
    mockedRepository = createMock<OrdersRepository>();
    useCase = new CreateOrderForCarrierUseCase(mockedRepository)
  })

  it("should create order succesfully", async () => {
    const createOrder = jest.spyOn(mockedRepository, 'createOrder');
    await useCase.exec({
      carrierId: "apl-test"
    })
    expect(createOrder).toHaveBeenCalled()
  })
})