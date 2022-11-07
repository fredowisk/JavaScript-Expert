import MongoHelper from "./mongoHelper.js";

export default class AccountMongoRepository {
  constructor() {
    this.collection = "accounts";
  }

  async save(accountData) {
    const accountCollection = await MongoHelper.getCollection(this.collection);
    const { acknowledged } = await accountCollection.insertOne(accountData);

    return acknowledged || null;
  }

  async findByEmail(email) {
    const accountCollection = await MongoHelper.getCollection(this.collection);
    const account = await accountCollection.findOne({ email });

    return account && MongoHelper.map(account);
  }

  async findById(accountId) {
    const accountCollection = await MongoHelper.getCollection(this.collection);
    const account = await accountCollection.findOne({_id: accountId})

    return account && MongoHelper.map(account);
  }

  async removeCredit(accountId, option) {
    const accountCollection = await MongoHelper.getCollection(this.collection);
    await accountCollection.updateOne(
      { _id: accountId },
      { $inc: { [`credits.${option}Credits`]: -1 } }
    );
  }

  async increaseCredits(accountId, option, creditAmount) {
    const accountCollection = await MongoHelper.getCollection(this.collection);
    await accountCollection.updateOne(
      { _id: accountId },
      { $inc: { [`credits.${option}Credits`]: creditAmount } }
    );
  }
}
