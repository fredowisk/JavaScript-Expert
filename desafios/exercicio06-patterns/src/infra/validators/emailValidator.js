export default class EmailValidator {
  static isValid(email) {

    const emailRegex =
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]{1,28}@[A-Za-z0-9]{1,10}\.[A-Za-z0-9]{2,3}\.?[A-Za-z0-9]{0,2}$/gm;

    return emailRegex.test(email);
  }
}