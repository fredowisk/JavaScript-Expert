import Project from "./project.js";
import safeRegex from "./util.js";

export default class TextProcessorFluentAPI {
  #content;
  constructor(content) {
    this.#content = content;
  }

  extractHeaders() {
    const extractRegex = safeRegex(/(?<=\n)(.+)/gs);

    [this.#content] = this.#content.match(extractRegex);

    return this;
  }

  splitValues() {
    const splitRegex = safeRegex(/\n/g);

    this.#content = this.#content.split(splitRegex);

    return this;
  }

  extractContent() {
    const splitRegex = safeRegex(/[^;]+/g);

    this.#content = this.#content.map((project) => project.match(splitRegex));

    return this;
  }

  mapRawObjects() {
    this.#content = this.#content.map((project) => {
      const [titulo, link, autor, etapa, ementa, indexadoresnorma] = project;

      return {
        titulo,
        link,
        autor,
        etapa,
        ementa,
        indexadoresnorma: indexadoresnorma ?? "",
      };
    });

    return this;
  }

  mapProjects() {
    this.#content = this.#content.map((project) => new Project(project));

    return this;
  }

  build() {
    return this.#content;
  }
}
