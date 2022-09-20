const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, doesNotReject, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 123,
        name: "Fred",
        profession: "JavaScript Instructor",
        birthDay: 1998,
      },
      {
        id: 321,
        name: "Xuxa da Silva",
        profession: "JavaScript Specialist",
        birthDay: 1942,
      },
      {
        id: 231,
        name: "Joaozinho",
        profession: "Java Developer",
        birthDay: 1992,
      },
    ];

    await doesNotReject(File.csvToJson(filePath));
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();