import { createServer } from "http";
import TeamService from "./service/teamService";

async function teamRoute(request, response) {
  response.writeHead(200);

  const teamService = new TeamService();

  const data = await teamService.getRandomPokemons();
  
  response.write(JSON.stringify(data))
  return response.end();
}

function defaultRoute(request, response) {
  response.writeHead(204);
  return response.end();
}

function handler(request, response) {
  const { url } = request;

  if (url === "/team") {
    return teamRoute(request, response)
  }

  return defaultRoute(request, response);
}

const app = createServer(handler).listen(3000, () =>
  console.log("Server running at 3000!")
);
export default app;
