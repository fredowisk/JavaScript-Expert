export default class DbRemoveCredit {
  constructor(removeCreditRepository) {
    this.removeCreditRepository = removeCreditRepository;
  }

  async remove(accountId, option) {
    await this.removeCreditRepository.removeCredit(accountId, option);
  }
}