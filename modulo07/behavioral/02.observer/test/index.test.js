import { expect, describe, test, jest, beforeAll } from "@jest/globals";
import Payment from "../src/events/payment.js";
import Marketing from "../src/observers/marketing.js";
import Shipment from "../src/observers/shipment.js";
import PaymentSubject from "../src/subjects/paymentSubject.js";

describe("Test Suite for Observer Pattern", () => {
  beforeAll(() => {
    //sobrescrevendo o console log, pra não aparecer nos testes
    jest.spyOn(console, console.log.name).mockImplementation(() => {});
  });

  test("#PaymentSubject notify observers", () => {
    const subject = new PaymentSubject();

    const observer = {
      update: jest.fn(),
    };

    const data = "hello world";

    subject.subscribe(observer);
    subject.notify(data);

    expect(observer.update).toBeCalledWith(data);
  });

  test("#PaymentSubject should not notify unsubscribed observers", () => {
    const subject = new PaymentSubject();

    const observer = {
      update: jest.fn(),
    };

    const data = "hello world";

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });

  test("#Payment should notify subject after a credit card transaction", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);

    const observer = {
      update: jest.fn(),
    };

    const notifySpy = jest.spyOn(subject, "notify");

    subject.subscribe(observer);
    const data = { userName: "Fredowisk" };
    payment.creditCard(data);

    expect(notifySpy).toBeCalledWith(data);
  });

  test("#should notify all subscribers after a credit card payment", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);

    const marketing = new Marketing();
    const shipment = new Shipment();

    const spies = {};

    const shipmentUpdateSpy = jest.spyOn(shipment, "update");
    const marketingUpdateSpy = jest.spyOn(marketing, "update");

    [marketing, shipment].forEach((observer) => {
      subject.subscribe(observer);
    });

    const data = { id: Date.now(), userName: "Fredowisk" };

    payment.creditCard(data);

    expect(shipmentUpdateSpy).toBeCalledWith(data);
    expect(marketingUpdateSpy).toBeCalledWith(data);
  });
});
