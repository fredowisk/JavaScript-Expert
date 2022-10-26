import { describe, test, expect } from "@jest/globals";

import TextProcessorFluentAPI from "../src/textProcessorFluentAPI.js";
import validMock from "./mock/valid.js";

describe.only("#Text Processor Fluent API Test Suite", () => {
  test("should build the textProcessorAPI", () => {
    const fluentAPI = new TextProcessorFluentAPI(validMock);

    const result = fluentAPI.build();

    expect(result).toStrictEqual(validMock);
  });

  test("should remove the headers when call extractHeaders", () => {
    const fluentAPI = new TextProcessorFluentAPI(validMock);

    const result = fluentAPI.extractHeaders().build();

    const expected = `Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;
Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;
Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;`;

    expect(result).toStrictEqual(expected);
  });

  test("should split the values when call splitValues", () => {
    const content = `Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;
Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;
Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;`;

    const fluentAPI = new TextProcessorFluentAPI(content);

    const result = fluentAPI.splitValues().build();

    const expected = [
      "Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;",
      "Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;",
      "Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;",
    ];

    expect(result).toStrictEqual(expected);
  });

  test("should return the project content when call extractContent", () => {
    const content = [
      "Projeto de lei 584/2016;http://www.al.sp.gov.br/propositura?id=1322563;Jorge Wilson Xerife do Consumidor;PAUTA;Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.;CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO;",
      "Projeto de lei 580/2016;http://www.al.sp.gov.br/propositura?id=1323286;Marcia Lia;PAUTA;Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.;NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA;",
      "Projeto de lei 545/2016;http://www.al.sp.gov.br/propositura?id=1322832;Roberto Morais, Itamar Borges;PAUTA;Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.;",
    ];

    const fluentAPI = new TextProcessorFluentAPI(content);

    const result = fluentAPI.extractContent().build();

    const expected = [
      [
        "Projeto de lei 584/2016",
        "http://www.al.sp.gov.br/propositura?id=1322563",
        "Jorge Wilson Xerife do Consumidor",
        "PAUTA",
        "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
        "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO",
      ],
      [
        "Projeto de lei 580/2016",
        "http://www.al.sp.gov.br/propositura?id=1323286",
        "Marcia Lia",
        "PAUTA",
        "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
        "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
      ],
      [
        "Projeto de lei 545/2016",
        "http://www.al.sp.gov.br/propositura?id=1322832",
        "Roberto Morais, Itamar Borges",
        "PAUTA",
        "Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.",
      ],
    ];

    expect(result).toStrictEqual(expected);
  });

  test("should map objects when call mapRawObjects", () => {
    const content = [
      [
        "Projeto de lei 584/2016",
        "http://www.al.sp.gov.br/propositura?id=1322563",
        "Jorge Wilson Xerife do Consumidor",
        "PAUTA",
        "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
        "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO",
      ],
      [
        "Projeto de lei 580/2016",
        "http://www.al.sp.gov.br/propositura?id=1323286",
        "Marcia Lia",
        "PAUTA",
        "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
        "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
      ],
      [
        "Projeto de lei 545/2016",
        "http://www.al.sp.gov.br/propositura?id=1322832",
        "Roberto Morais, Itamar Borges",
        "PAUTA",
        "Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.",
      ],
    ];

    const fluentAPI = new TextProcessorFluentAPI(content);

    const result = fluentAPI.mapRawObjects().build();

    const expected = [
      {
        titulo: "Projeto de lei 584/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1322563",
        autor: "Jorge Wilson Xerife do Consumidor",
        etapa: "PAUTA",
        ementa:
          "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
        indexadoresnorma:
          "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO",
      },
      {
        titulo: "Projeto de lei 580/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1323286",
        autor: "Marcia Lia",
        etapa: "PAUTA",
        ementa:
          "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
        indexadoresnorma:
          "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
      },
      {
        titulo: "Projeto de lei 545/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1322832",
        autor: "Roberto Morais, Itamar Borges",
        etapa: "PAUTA",
        ementa:
          "Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.",
        indexadoresnorma: "",
      },
    ];

    expect(result).toStrictEqual(expected);
  });

  test("should map projects when call mapProjects", () => {
    const content = [
      {
        titulo: "Projeto de lei 584/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1322563",
        autor: "Jorge Wilson Xerife do Consumidor",
        etapa: "PAUTA",
        ementa:
          "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
        indexadoresnorma:
          "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO",
      },
      {
        titulo: "Projeto de lei 580/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1323286",
        autor: "Marcia Lia",
        etapa: "PAUTA",
        ementa:
          "Estabelece normas gerais para a realização de Concurso Público pela Administração Pública Direta e Indireta do Estado.",
        indexadoresnorma:
          "NORMAS, REALIZAÇÃO, CONCURSO PÚBLICO ESTADUAL, ESTADO DE SÃO PAULO, ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
      },
      {
        titulo: "Projeto de lei 545/2016",
        link: "http://www.al.sp.gov.br/propositura?id=1322832",
        autor: "Roberto Morais, Itamar Borges",
        etapa: "PAUTA",
        ementa:
          "Altera a Lei nº 13.550, de 2009, que dispõe sobre a utilização e proteção da vegetação nativa do Bioma Cerrado no Estado de São Paulo.",
        indexadoresnorma: "",
      },
    ];

    const fluentAPI = new TextProcessorFluentAPI(content);

    const result = fluentAPI.mapProjects().build();

    const expected = [
      {
        id: "1322563",
        numero: "584",
        ano: "2016",
        autores: [
          {
            nome: "Jorge Consumidor",
          },
        ],
        url: "http://www.al.sp.gov.br/propositura?id=1322563",
        indexadores: [
          "CONTRATO",
          "OBRIGATORIEDADE",
          "CLÁUSULA",
          "SERVIÇO",
          "TELEFONIA MÓVEL",
          "TELEFONIA FIXA",
          "PRAZO",
          "INCLUSÃO",
          "RESCISÃO CONTRATUAL",
          "LIBERAÇÃO",
        ],
      },
      {
        id: "1323286",
        numero: "580",
        ano: "2016",
        autores: [
          {
            nome: "Marcia Lia",
          },
        ],
        url: "http://www.al.sp.gov.br/propositura?id=1323286",
        indexadores: [
          "NORMAS",
          "REALIZAÇÃO",
          "CONCURSO PÚBLICO ESTADUAL",
          "ESTADO DE SÃO PAULO",
          "ADMINISTRAÇÃO PÚBLICA DIRETA E INDIRETA",
        ],
      },
      {
        id: "1322832",
        numero: "545",
        ano: "2016",
        autores: [{ nome: "Roberto Morais" }, { nome: "Itamar Borges" }],
        url: "http://www.al.sp.gov.br/propositura?id=1322832",
        indexadores: [],
      },
    ];

    expect(result).toMatchObject(expected);
  });
});
