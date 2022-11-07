export default class DbFindAccountByEmail {
  constructor(findAccountRepository) {
    this.findAccountByIdRepository = findAccountRepository;
  }

  async find(accountId) {
    const account = await this.findAccountByIdRepository.findById(accountId);

    return account || null
  }
}