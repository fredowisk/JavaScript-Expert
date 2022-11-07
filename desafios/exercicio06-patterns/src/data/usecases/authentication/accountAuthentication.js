export default class AccountAuthentication {
  constructor(findAccountByEmailRepository) {
    this.findAccountByEmailRepository = findAccountByEmailRepository;
  }

  async auth(email) {
    const account = await this.findAccountByEmailRepository.findByEmail(
      email
    );

    return account || null
  }
}
