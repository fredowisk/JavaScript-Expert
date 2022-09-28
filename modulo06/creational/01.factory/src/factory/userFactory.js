const UserRepository = require("../repository/userRepository");
const UserService = require("../service/userService");
const Database = require("../util/database");

class UserFactory {
  static async createInstance() {
    const database = new Database({ connectionString: "mongodb://localhost" });
    const dbConnection = await database.connect();
    const userRepository = new UserRepository({ dbConnection });
    return new UserService({ userRepository });
  }
}

module.exports = UserFactory;
