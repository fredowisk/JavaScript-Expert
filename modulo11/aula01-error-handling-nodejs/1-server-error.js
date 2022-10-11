import Http from "http";

let count = 1;
//curl -i -X POST -d '{}' localhost:3000
async function handler(req, res) {
  count++;
  try {
    if (count % 2 === 0) {
      await Promise.reject("error inside handler!");
    } else {
      for await (const data of req) {
        try {
          await Promise.reject("error inside for!");
        } catch (error) {
          console.log("a request error happened!", error);
          res.writeHead(500);
          res.write(JSON.stringify({ message: "internal server error!" }));
        } finally {
          res.end();
        }
      }
    }
  } catch (error) {
    console.log("a server error happened!", error);
    res.writeHead(500);
    res.write(JSON.stringify({ message: "internal server error!" }));
    res.end();
  }
}

Http.createServer(handler).listen(3000, () => console.log("running at 3000"));
