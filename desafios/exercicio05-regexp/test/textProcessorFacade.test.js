import {describe, test, expect} from '@jest/globals';
import TextProcessorFacade from '../src/textProcessorFacade.js';
import validMock from './mock/valid.js';

describe.only('#Text Processor Facade Test Suite', () => {
  test('should extract project from a csv when call getProjectFromCSV', () => {
    const textProcessorFacade = new TextProcessorFacade(validMock);

    const result = textProcessorFacade.getProjectFromCSV();

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

    expect(result).toMatchObject(expected)
  });
});