import {MongoClient} from "mongodb";

export default class MongoHelper {
  static async connect(uri) {
    this.uri = uri;
    this.client = await MongoClient.connect(this.uri);
  }

  static disconnect() {
    this.client.close();
    this.client = null;
  }

  static async getCollection(name) {
    if (!this.client) await this.connect(this.uri);
    return this.client.db().collection(name);
  }

  static async clear(name) {
    const collection = await this.getCollection(name);
    collection.deleteMany({});
  }

  static map(data) {
    const {_id, accountId, ...rest} = data;
    return {...rest, id: _id}
  }
}
