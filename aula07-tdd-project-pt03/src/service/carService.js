const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");
const BaseRepository = require("./../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    return await this.carRepository.find(carId);
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[randomCarIndex];
  }

  calculateFinalPrice({ age }, { price }, numberOfDays) {
    const { then: tax } = this.taxesBasedOnAge.find(
      (currentTax) => age <= currentTax.to
    );

    const result = price * tax * numberOfDays;
    return this.currencyFormat.format(result);
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = await this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dueDate = today.toLocaleDateString("pt-br", options);

    const transaction = new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate,
    });

    return transaction;
  }
}

module.exports = CarService;
