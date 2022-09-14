const sinon = require("sinon");
const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");

const { join } = require("path");

const CarService = require("./../../src/service/carService");
const Transaction = require("../../src/entities/transaction");

const carsDatabase = join(__dirname, "./../../database", "cars.json");

const mocks = {
  validCar: require("../mocks/valid-car.json"),
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCustomer: require("../mocks/valid-customer.json"),
};

describe("CarService Tests Suite", () => {
  let carService = {};
  let sandbox = {};
  const currencyFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);
    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("should choose the first id from carIds in carCategory", async () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = await carService.chooseRandomCar(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });

  it("should return an available car if given a carCategory", async () => {
    const car = mocks.validCar;
    //Criando uma instância imutável, pra não modificar o objeto pai
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(result).to.be.deep.equal(expected);
  });

  it("should calculate and return the final renting price in BRL", () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    //pra propriedades dentro de uma classe, precisamos passar como texto
    sandbox
      .stub(carService, "taxesBasedOnAge")
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const rentingPrice = 244.4;
    const expected = currencyFormat.format(rentingPrice);

    expect(result).to.be.equal(expected);
  });

  it("should return a transaction receipt given a customer and a car category", async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };

    const customer = {
      ...mocks.validCustomer,
      age: 20,
    };

    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2020";

    const today = new Date("11/05/2020");

    sandbox.useFakeTimers(today.getTime());

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    const expectedAmount = carService.currencyFormat.format(206.8);
    const result = await carService.rent(customer, carCategory, numberOfDays);

    const expected = new Transaction({
      customer,
      car,
      amount: expectedAmount,
      dueDate,
    });

    expect(result).to.be.deep.equal(expected);
  });
});
