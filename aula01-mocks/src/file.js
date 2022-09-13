const { readFile } = require("fs/promises");
const User = require("./user");
const { error } = require("./constants");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (validation.error) throw new Error(validation.error);

    const users = File.parseCSVtoJSON(content);
    return users;
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");
    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
      };
    }

    const isContentLengthAccept =
      fileWithoutHeader.length <= options.maxLines && fileWithoutHeader.length;
    if (!isContentLengthAccept) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
      };
    }

    return { error: null };
  }

  static parseCSVtoJSON(csvString) {
    const lines = csvString.split("\n");
    //remove o primeiro item e joga na variável
    const firstLine = lines.shift();
    const header = firstLine.split(",");
    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      return new User(user);
    });
    return users;
  }
}

module.exports = File;
