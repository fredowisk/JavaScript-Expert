import { createServer } from "http";
import { parse, fileURLToPath } from "url";
import { Worker } from "worker_threads";

import sharp from "sharp";

import { dirname } from "path";

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = "worker.js";

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${currentFolder}/${workerFileName}`);
    worker.postMessage(images);
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0)
        return reject(
          new Error(`Thread ${worker.threadId} stopped with exit code ${code}`)
        );

      console.log(`The Thread ${worker.threadId} exited!`);
    });
  });
}

createServer(async (request, response) => {
  if (request.url.includes("joinImages")) {
    const {
      query: { img, background },
    } = parse(request.url, true);
    const imageBase64 = await joinImages({
      image: img,
      background,
    });

    response.writeHead(200, {
      "Content-Type": "text/html",
    });

    response.end(
      `<img style="width:100%;height:100%" src="data:image/jpeg;base64,${imageBase64}"/>`
    );
    return;
  }

  response.end();
}).listen(3000, () => console.log("Server running at 3000!"));

// https://www.pngmart.com/files/12/My-Neighbor-Totoro-Transparent-Background.png
// https://i.imgur.com/MuUwwmT.png

// backgrounds
// https://wallpapercave.com/wp/wp3181495.jpg
// https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/125478712/original/7559024089365e73575d122698a78403f54cf2d9/draw-your-background-photo-into-ghibli-style.jpg
