import TextProcessorFluentAPI from "./textProcessorFluentAPI.js";

export default class TextProcessorFacade {
  constructor(text) {
    this.textProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }

  getProjectFromCSV() {
    return this.textProcessorFluentAPI
      .extractHeaders()
      .splitValues()
      .extractContent()
      .mapRawObjects()
      .mapProjects()
      .build();
  }
}
