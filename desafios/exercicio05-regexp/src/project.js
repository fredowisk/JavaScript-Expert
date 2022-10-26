import evaluateRegex from "./util.js";

export default class Project {
  constructor({ titulo, link, autor, indexadoresnorma }) {
    const [numero, ano] = titulo.match(evaluateRegex(/(\d+)/g));
    const generateAutorNames = () => {
      const splitRegex = /,\s/;
      const splitAutorNames = autor.split(splitRegex);
      return splitAutorNames.map((item) => ({
        nome: item.match(evaluateRegex(/^(\w+)|(\w+)$/g))?.join(" "),
      }));
    };

    [this.id] = link.match(evaluateRegex(/(?<=id=)(\d+)/g));
    this.numero = numero;
    this.ano = ano;
    this.url = link;
    this.autores = generateAutorNames();
    this.indexadores = indexadoresnorma ? indexadoresnorma.split(/,\s/) : [];
  }
}
