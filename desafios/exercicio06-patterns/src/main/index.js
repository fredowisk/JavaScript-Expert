import MongoHelper from "../infra/database/mongodb/mongoHelper.js";
import env from "./config/env.js";
import Terminal from "../util/terminal.js";

import App from "./app.js";

await MongoHelper.connect(env.mongoUrl);

const terminal = new Terminal();
new App(terminal).initialize()