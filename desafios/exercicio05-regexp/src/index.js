// import { createReadStream } from "fs";
import { readFile } from "fs/promises";

import TextProcessorFacade from "./textProcessorFacade.js";

(async () => {
  const csvBuffer = await readFile("./docs/projeto-de-lei.csv", "utf-8");
  const textProcessorFacade = new TextProcessorFacade(csvBuffer);

  const project = textProcessorFacade.getProjectFromCSV();

  console.log("project", project);

  // Alternativa usando stream

  // let csvBuffer = '';

  // const readStream = createReadStream("./docs/projeto-de-lei.csv", "utf-8");

  // readStream.on('data', (chunk) => {
  //   csvBuffer+=chunk;
  // })

  // readStream.on('end', () => {

  //   const textProcessorFacade = new TextProcessorFacade(csvBuffer);

  //   const project = textProcessorFacade.getProjectFromCSV();

  //   console.log("project", project);
  // })
})();
