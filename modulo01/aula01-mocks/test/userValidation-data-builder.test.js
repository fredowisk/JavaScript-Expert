const { expect } = require("chai");
const { describe, it } = require("mocha");

const { error } = require("../src/constants");

const UserDataBuilder = require("./model/userDataBuilder");

describe("Test File Builder", () => {
  it("shouldn't return error with valid user", () => {
    const filePath = "test/mocks/threeItems-valid.csv";
    const result = UserDataBuilder.aUser(filePath)
      .getFileContent()
      .isValid()
      .build();

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

    expect(result).to.be.deep.equal(expected);
  });

  describe("User Validation Rules", () => {
    it("should throw an error when try to create User with a empty file", () => {
      const filePath = "test/mocks/emptyFile-invalid.csv";

      expect(() =>
        UserDataBuilder.aUser(filePath).getFileContent().isValid().build()
      ).to.throw(error.FILE_LENGTH_ERROR_MESSAGE);
    });

    it("should throw an error when try to read a file with four users", () => {
      const filePath = "test/mocks/fourItems-invalid.csv";

      expect(() =>
        UserDataBuilder.aUser(filePath).getFileContent().isValid().build()
      ).to.throw(error.FILE_LENGTH_ERROR_MESSAGE);
    });

    it("should throw an error when try to read a file with invalid header", () => {
      const filePath = "test/mocks/invalid-header.csv";

      expect(() =>
        UserDataBuilder.aUser(filePath).getFileContent().isValid().build()
      ).to.throw(error.FILE_FIELDS_ERROR_MESSAGE);
    });
  });
});
