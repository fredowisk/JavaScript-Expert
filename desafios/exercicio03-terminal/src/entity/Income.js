import languageConfig from "../config/language.js";

const defaultLanguage = languageConfig.default;

class Income {
  constructor({ position, expectation, conversions }) {
    this.position = position;
    this.expectation = {
      currency: "BRL",
      language: "pt-BR",
      value: expectation * conversions["BRL"],
    };
    this.conversion01 = {
      currency: "USD",
      language: "en-US",
      value: expectation * conversions["USD"],
    };
    this.conversion02 = {
      currency: "EUR",
      language: "en-GB",
      value: expectation * conversions["EUR"],
    };
    this.conversion03 = {
      currency: "RUB",
      language: "ru-RU",
      value: expectation * conversions["RUB"],
    };
  }

  format() {
    return {
      position: this.position,
      expectation: this.formatCurrency(this.expectation),
      conversion01: this.formatCurrency(this.conversion01),
      conversion02: this.formatCurrency(this.conversion02),
      conversion03: this.formatCurrency(this.conversion03),
    };
  }

  formatCurrency({ currency, language, value }) {
    const chosenLanguage = language || defaultLanguage;

    return new Intl.NumberFormat(chosenLanguage, {
      style: "currency",
      currency,
    }).format(value);
  }
}

export default Income;
