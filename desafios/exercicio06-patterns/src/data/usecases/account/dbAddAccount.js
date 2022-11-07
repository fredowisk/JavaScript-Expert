export default class DbAddAccount {
  constructor(addAccountRepository) {
    this.addAccountRepository = addAccountRepository;
  }

  async save(accountData) {
    const isSaved = await this.addAccountRepository.save(accountData);

    return isSaved || null;
  }
}