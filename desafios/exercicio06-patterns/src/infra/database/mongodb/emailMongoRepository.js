import MongoHelper from "./mongoHelper.js";

export default class EmailMongoRepository {
  constructor() {
    this.collection = "emails";
  }

  async save(emailData) {
    const emailCollection = await MongoHelper.getCollection(this.collection);
    await emailCollection.insertOne(emailData);
  }

  async listByAccountId(accountId) {
    const emailCollection = await MongoHelper.getCollection(this.collection);
    const emailData = await emailCollection.find({ accountId }).toArray();

    return emailData?.map(email => MongoHelper.map(email));
  }
}
