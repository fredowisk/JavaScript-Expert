export default class RemoveCreditController {
  constructor(removeCredit){
    this.removeCredit = removeCredit
  }

  async handle(accountData) {
    try {

      const {accountToken, option} = accountData;

      await this.removeCredit.remove(accountToken, option);

      return
    } catch (error) {
      console.error('Internal App Error');
    }
  }
}