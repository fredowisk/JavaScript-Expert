export default class DbFindCreditsByAccount {
  constructor(findCreditsRepository) {
    this.findCreditsByAccountRepository = findCreditsRepository;
  }

  async find(accountId, option) {
    const account = await this.findCreditsByAccountRepository.findById(
      accountId
    );

    return account.credits[`${option}Credits`];
  }
}
