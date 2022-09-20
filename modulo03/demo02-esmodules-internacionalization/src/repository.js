import { writeFile, readFile } from "fs/promises";
import { fileURLToPath } from "url";

export default class Repository {
  static get databaseFile() {
    //nao tem __filename, __dirname
    return fileURLToPath(
      new URL("../database.json", import.meta.url)
    );
  }

  static async save(data) {

    const currentData = JSON.parse(await readFile(this.databaseFile));
    currentData.push(data);

    await writeFile(this.databaseFile, JSON.stringify(currentData));
  }
}

// 2 Moto,Carro,Aviao 20000 2020-01-02 2022-02-01
