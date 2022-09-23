'use strict';
const http = require("http");
const CarService = require("../service/carService");
const [carCategory] = require("../../database/carCategories");
const { join } = require("path");

const carsDatabase = join(__dirname, "../../database", "cars.json");
const carService = new CarService({ cars: carsDatabase });

const routes = {
  "/car:get": async (request, response) => {
    const car = await carService.getAvailableCar(carCategory);
    response.write(JSON.stringify(car));
    return response.end();
  },

  "/calculate:get": (request, response) => {
    const totalPrice = carService.calculateFinalPrice(
      { age: 50 },
      { price: 37.6 },
      5
    );
    response.write(totalPrice);
    return response.end();
  },

  "/rent:get": async (request, response) => {
    carCategory.price = 37.6;
    const transaction = await carService.rent(
      { name: "Fred", age: 50 },
      carCategory,
      5
    );
    response.write(JSON.stringify(transaction));
    return response.end();
  },

  default: (request, response) => {
    response.writeHead(404).write("Page not found!");
    response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;

  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  return chosen(request, response);
};

const app = http.createServer(handler).listen(3000, () => {
  console.log("app running at", 3000);
});

module.exports = app;
