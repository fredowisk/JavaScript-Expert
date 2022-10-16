import { createServer } from "http";
import TeamRepository from "./repository/teamRepository";
import TeamService from "./service/teamService";

async function teamRoute(request, response) {
  const teamRepository = new TeamRepository();
  const teamService = new TeamService(teamRepository);

  const team = await teamService.getRandomTeam();

  response.writeHead(200, {
    "Content-Type": "application/json",
  });

  response.write(JSON.stringify(team));
  return response.end();
}

function defaultRoute(request, response) {
  response.writeHead(204);
  return response.end();
}

function handler(request, response) {
  const { url } = request;

  if (url === "/team") {
    return teamRoute(request, response);
  }

  return defaultRoute(request, response);
}

const app = createServer(handler).listen(3000, () =>
  console.log("Server running at 3000!")
);
export default app;
