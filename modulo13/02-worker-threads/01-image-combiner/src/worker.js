import { parentPort, threadId } from "worker_threads";
import sharp from "sharp";
import axios from "axios";

async function downloadFile(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return response.data;
}

async function onMessage({ image, background }) {
  const firstLayer = await sharp(await downloadFile(image)).resize(250, 200)
    .toBuffer();

  const secondLayer = await sharp(await downloadFile(background))
    .composite([{ input: firstLayer, top: 405, left: 780 }])
    .toBuffer();

  parentPort.postMessage(secondLayer.toString("base64"));
}

parentPort.on("message", onMessage);
