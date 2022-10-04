import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

describe("#Order Business Test Suite", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should execute Order Business without Template Method", () => {
    const order = new Order({
      customerId: 1,
      amount: 100_000,
      products: [{ description: "ferrari" }],
    });

    const orderBusiness = new OrderBusiness();
    // todos devs devem obrigatóriamente lembrar de
    // seguir a risca esse fluxo de execução.
    // se algum esquecer de chamar a função de validação, pode quebrar todo o sistema!

    const isValid = orderBusiness._validateRequiredFields(order);
    expect(isValid).toBeTruthy();

    const result = orderBusiness._create(order);
    expect(result).toBeTruthy();
  });

  test("should execute Order Business with Template Method", () => {
    const order = new Order({
      customerId: 1,
      amount: 100_000,
      products: [{ description: "ferrari" }],
    });

    const orderBusiness = new OrderBusiness();

    const validateRequiredFieldsSpy = jest.spyOn(
      orderBusiness,
      "_validateRequiredFields"
    );
    const createOrderSpy = jest.spyOn(orderBusiness, "_create");

    // com template method, a sequência de passos é sempre executada
    // evita a replicação de lógica
    const result = orderBusiness.create(order);
    expect(result).toBeTruthy();
    expect(validateRequiredFieldsSpy).toBeCalledWith(order);
    expect(createOrderSpy).toBeCalledWith(order);
  });
});
