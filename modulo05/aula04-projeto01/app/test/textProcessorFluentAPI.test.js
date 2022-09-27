const { expect } = require("chai");
const { describe, it } = require("mocha");
const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI");
const mockContract = require("./mock/valid");

describe("TextProcessorFluentAPI", () => {
  it("should #build the content property", () => {
    const result = new TextProcessorFluentAPI(mockContract).build();

    expect(result).to.be.deep.equal(mockContract);
  });

  it("#extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(mockContract)
      .extractPeopleData()
      .build();

    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("should #divideTextInColumns", () => {
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();

    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("should #removeEmptyCharacters", () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];

    const result = new TextProcessorFluentAPI(content)
      .removeEmptyCharacters()
      .build();

    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("should #mapPerson", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentAPI(content).mapPerson().build();

    const expected = [
      {
        nome: "Xuxa da Silva",
        nacionalidade: "Brasileira",
        estadoCivil: "Casada",
        CPF: "23574342012",
        rua: "Rua dos bobos",
        numero: "zero",
        bairro: "Alphaville",
        estado: "São Paulo",
      },
    ];

    expect(result).to.be.deep.equal(expected);
  });
});
