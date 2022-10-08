import { Readable, Writable, Transform } from "stream";
import { createWriteStream } from "fs";

// fonte de dados
const readable = Readable({
  read() {
    for (let index = 0; index < 1e5; index++) {
      const person = { id: Date.now() + index, name: `Fred-${index}` };
      const data = JSON.stringify(person);
      this.push(data);
    }

    //informa que os dados acabaram
    this.push(null);
  },
});

// processamento dos dados

const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const { id, name } = JSON.parse(chunk);
    const result = `${id},${name.toUpperCase()}\n`;

    cb(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter++;
    cb(null, "id, name\n".concat(chunk));
  },
});

// saida de dados

// const writable = Writable({
//   write(chunk, encoding, cb) {
//     console.log("msg", chunk.toString());

//     cb();
//   },
// });

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // writable é sempre a saída -> imprimir, salvar, ignorar
  // .pipe(writable);
  //saida de dados
  // .pipe(process.stdout);
  .pipe(createWriteStream("my.csv"));

pipeline.on("end", () => console.log("acabou!!!"));
