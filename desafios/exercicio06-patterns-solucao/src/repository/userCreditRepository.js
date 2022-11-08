export default class UserCreditRepository {
  constructor({ db }) {
    this.db = db;
  }

  find(userID, platform) {
    return this.db[userID][platform];
  }

  add(userID, platform, quantity = 1) {
    const credits = this.db[userID][platform];
    const newCredits = credits + quantity;
    this.db[userID][platform] = newCredits;

    return newCredits;
  }

  remove(userID, platform) {
    const credits = this.db[userID][platform];
    const newCredits = credits - 1;
    this.db[userID][platform] = newCredits;

    return newCredits;
  }
}
