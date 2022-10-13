import { createServer } from "http";
import { randomUUID } from "crypto";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";

createServer(async (request, response) => {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(request, createWriteStream(fileName));

  response.end("upload with success!");
}).listen(3000, () => console.log("Server running at 3000!"));
