const { evaluateRegex } = require("./util");

class Person {
  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    CPF,
    rua,
    numero,
    bairro,
    estado,
  ]) {
    // ^ | começo da string
    // + | um ou mais ocorrências
    // (\w{1}) | pega só a primeira letra e deixa em um grupo
    // (a-zA-Z) | encontra letras maiúsculas e minúsculas, adicionamos + pra ele
    // pegar todas até o caracter especial
    // g | todas as ocorrências que encontrar
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
    const formatFirstLetter = (prop) => {
      return prop.replace(
        firstLetterExp,
        (fullMatch, group1, group2, index) =>
          group1.toUpperCase() + group2.toLowerCase()
      );
    };

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);

    // tudo que não for digito vira vazio
    // /g serve para remover todas as ocorrencias que encontrar
    this.CPF = CPF.replace(evaluateRegex(/(\D)/g), "");

    // começa a procurar depois do " a " e pega tudo que tem a frente
    // (?<=) | faz com que ignore tudo que tiver antes desse match
    // conhecido como positive look behind
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).+$/))[0];
    this.numero = numero;

    // começa a buscar depois do espaço, pega qualquer letra ou digito até o fim da linha
    // poderia ser o .* também
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).+$/))[0];

    // remove o ponto literal (.) do fim da frase
    this.estado = estado.replace(evaluateRegex(/\.$/), "");
  }
}

module.exports = Person;
