class Database {
  constructor({ connectionString }) {
    this.connectionString = connectionString;
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async connect() {
    await this.sleep(200);
    return this;
  }

  async find(query) {
    await this.sleep(200);
    return [{ name: "Fredowisk" }];
  }
}

module.exports = Database;
