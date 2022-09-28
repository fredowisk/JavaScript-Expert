const User = require("../../src/entities/user");
const { readFileSync } = require("fs");
const { error, DEFAULT_OPTION: options } = require("../../src/constants");

class UserDataBuilder {
  constructor(filePath) {
    this.users = [];
    this.content = "";
    this.filePath = filePath;
  }

  static aUser(filePath) {
    return new UserDataBuilder(filePath);
  }

  getFileContent() {
    this.content = readFileSync(this.filePath).toString("utf-8").split("\n");

    return this;
  }

  isValid() {
    const [header, ...fileWithoutHeader] = this.content;
    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      throw new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    }

    const isContentLengthAccept =
      fileWithoutHeader.length <= options.maxLines && fileWithoutHeader.length;

    if (!isContentLengthAccept) {
      throw new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    }

    return this;
  }

  build() {
    //remove o primeiro item e joga na variável
    const header = this.content.shift().split(",");

    this.content.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      this.users.push(new User(user));
    });

    return this.users;
  }
}

module.exports = UserDataBuilder;
