export default class RemoveCreditController {
  constructor(findCredits) {
    this.findCredits = findCredits;
  }

  async handle(accountData) {
    try {

      const { accountToken, option } = accountData;

      const credits = await this.findCredits.find(accountToken, option);

      return credits;
    } catch (error) {
      console.error("Internal App Error");
    }
  }
}
