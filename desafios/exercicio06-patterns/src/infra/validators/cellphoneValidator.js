export default class CellphoneValidator {
  static isValid(cellphoneNumber) {

    const cellphoneRegex = /^\d{12}$/gm

    return cellphoneRegex.test(cellphoneNumber);
  }
}