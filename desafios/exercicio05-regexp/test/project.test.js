import { describe, test, expect } from "@jest/globals";
import Project from "../src/project.js";

describe("#Project Test Suite", () => {
  test("should generate a project instance from rawObject", () => {
    const content = {
      titulo: "Projeto de lei 584/2016",
      link: "http://www.al.sp.gov.br/propositura?id=1322563",
      autor: "Jorge Wilson Xerife do Consumidor",
      etapa: "PAUTA",
      ementa:
        "Dispõe sobre a inclusão de cláusula nos contratos de adesão aos serviços de telefonia fixa, de telefonia móvel e de banda larga móvel, e dá outras providências.",
      indexadoresnorma:
        "CONTRATO, OBRIGATORIEDADE, CLÁUSULA, SERVIÇO, TELEFONIA MÓVEL, TELEFONIA FIXA, PRAZO, INCLUSÃO, RESCISÃO CONTRATUAL, LIBERAÇÃO",
    };

    const project = new Project(content);

    const expected = {
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
    };

    expect(project).toMatchObject(expected);
  });
});
