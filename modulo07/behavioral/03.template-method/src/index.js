import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: 2,
  amount: 200_000,
  products: [{ description: "shampoo" }],
});

const orderBusiness = new OrderBusiness();

const result = orderBusiness.create(order);
console.log("Order Created!", result);
